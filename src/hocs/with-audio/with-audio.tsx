import React, {createRef, PureComponent} from "react";


interface Props {
  isPlaying: boolean,
  onPlayButtonClick: () => void,
  src: string,
}

interface State {
  isLoading: boolean;
  isPlaying: boolean;
  progress: number;
}

const withAudio = (Component) => {
  class WithAudio extends PureComponent<Props, State> {
    private audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props: Props) {
      super(props);

      this.audioRef = createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
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
          isPlaying: true,
        });
      };

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    componentDidUpdate() {
      const audio = this.audioRef.current;

      if (this.state.isPlaying) {
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
      const {isPlaying} = this.state;

      this.setState({isPlaying: !isPlaying});
      onPlayButtonClick();
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
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
