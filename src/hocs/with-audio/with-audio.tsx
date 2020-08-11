import * as React from "react";


interface Props {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  src: string;
}

interface State {
  isLoading: boolean;
  isPlayingReal: boolean;
  progress: number;
}

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent<Props, State> {
    private audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props: Props) {
      super(props);

      this.audioRef = React.createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlayingReal: props.isPlaying,
      };

      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this.audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => {
        this.setState({
          isPlayingReal: true,
        });
      };

      audio.onpause = () => this.setState({
        isPlayingReal: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    componentDidUpdate() {
      const audio = this.audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this.audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    handlePlayButtonClick() {
      const {onPlayButtonClick} = this.props;
      const {isPlayingReal} = this.state;

      this.setState({isPlayingReal: !isPlayingReal});
      onPlayButtonClick();
    }

    render() {
      const {isLoading, isPlayingReal} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlayingReal}
          onPlayButtonClick={this.handlePlayButtonClick}
        >
          <audio
            ref={this.audioRef}
          />
        </Component>
      );
    }
  }

  return WithAudio;
};


export default withAudio;
