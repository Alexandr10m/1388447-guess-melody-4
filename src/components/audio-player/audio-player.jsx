import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";


export default class AudioPlayer extends PureComponent {
  render() {
    const {isLoading, isPlaying, onPlayButtonClick, childern} = this.state;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          {childern}
        </div>
      </Fragment>
    );
  }
}


AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  childern: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
