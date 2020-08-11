import * as React from "react";
import {mount} from "enzyme";
import withAudio from "./with-audio";
import {noop} from "../../utils";


interface PlayerProps {
  children: React.ReactNode;
  onPlayButtonClick: () => void
}

const Player = (props: PlayerProps) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

describe(`E2E test of withAudio`, () => {
  it(`Checks that HOC's callback turn on audio (play)`, () => {
    const PlayerWrapped = withAudio(Player);
    const wrapper = mount(
        <PlayerWrapped
          isPlaying={false}
          onPlayButtonClick={noop}
          src=""
        />);

    window.HTMLMediaElement.prototype.play = () => Promise.resolve();

    const {audioRef} = wrapper.instance();
    jest.spyOn(audioRef.current, `play`);

    wrapper.instance().componentDidMount();
    wrapper.find(`button`).simulate(`click`);

    expect(audioRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Checks that HOC's callback turn off audio (pause)`, () => {
    const PlayerWrapped = withAudio(Player);
    const wrapper = mount(
        <PlayerWrapped
          isPlaying={true}
          onPlayButtonClick={noop}
          src=""
        />);

    window.HTMLMediaElement.prototype.pause = noop;

    const {audioRef} = wrapper.instance();
    jest.spyOn(audioRef.current, `pause`);

    wrapper.instance().componentDidMount();
    wrapper.find(`button`).simulate(`click`);

    expect(audioRef.current.pause).toHaveBeenCalledTimes(1);
  });

});
