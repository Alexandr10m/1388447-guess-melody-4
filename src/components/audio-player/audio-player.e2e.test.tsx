import React from "react";
import {shallow} from "enzyme";
import AudioPlayer from "./audio-player";

describe(`E2E test of AudioPlayer`, () => {
  it(`Click by Play button calls callback`, () => {

    const handlePlayButtonClick = jest.fn();
    const wrapper = shallow(
        <AudioPlayer
          isLoading={false}
          isPlaying={false}
          onPlayButtonClick={handlePlayButtonClick}>
          <audio />
        </AudioPlayer>);

    wrapper.find(`.track__button`).simulate(`click`);
    expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);
  });
});

