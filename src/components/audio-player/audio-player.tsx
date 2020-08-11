import React, {PureComponent, Fragment} from "react";


interface Props {
  isLoading: boolean;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  children: React.ReactNode;
}

class AudioPlayer extends PureComponent<Props, {}> {
  render() {
    const {isLoading, isPlaying, onPlayButtonClick, children} = this.props;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          {children}
        </div>
      </Fragment>
    );
  }
}


export default AudioPlayer;
