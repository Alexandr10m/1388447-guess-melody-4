import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";
import withAudio from "./with-audio.js";

const Player = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

Player.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

describe(`E2E test of withAudio`, () => {
  it(`Checks that HOC's callback turn on audio (play)`, () => {
    const PlayerWrapped = withAudio(Player);
    const wrapper = mount(
        <PlayerWrapped
          isPlaying={false}
          onPlayButtonClick={() => {}}
          src=""
        />);

    window.HTMLMediaElement.prototype.play = () => {};
    const {_audioRef} = wrapper.instance();
    jest.spyOn(_audioRef.current, `play`);
    wrapper.instance().componentDidMount();
    wrapper.find(`button`).simulate(`click`);
    expect(_audioRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Checks that HOC's callback turn off audio (pause)`, () => {
    const PlayerWrapped = withAudio(Player);
    const wrapper = mount(
        <PlayerWrapped
          isPlaying={true}
          onPlayButtonClick={() => {}}
          src=""
        />);

    window.HTMLMediaElement.prototype.pause = () => {};
    const {_audioRef} = wrapper.instance();
    jest.spyOn(_audioRef.current, `pause`);
    wrapper.instance().componentDidMount();
    wrapper.find(`button`).simulate(`click`);

    expect(_audioRef.current.pause).toHaveBeenCalledTimes(1);
  });

});
