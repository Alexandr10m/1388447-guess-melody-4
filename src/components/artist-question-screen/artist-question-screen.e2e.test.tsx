import React from "react";
import {shallow} from "enzyme";
import ArtistQuestionScreen from "./artist-question-screen";
import {GameType, QustionArtist} from "../../types";
import {noop} from "../../utils";


const question: QustionArtist = {
  type: GameType.ARTIST,
  song: {
    artist: ``,
    src: ``
  },
  answers: [
    {
      artist: `one`,
      picture: `pic-one`,
    },
    {
      artist: `two`,
      picture: `pic-two`,
    },
    {
      artist: `three`,
      picture: `pic-three`,
    },
  ],
};

const mockEvent = {
  preventDefault: noop,
  target: {
    id: `0`,
  },
};

describe(`E2E test of ArtistQuestionScreen`, () => {
  it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
    const onAnswer = jest.fn();
    const userAnswer = {
      artist: `one`,
      picture: `pic-one`,
    };

    const screen = shallow(<ArtistQuestionScreen
      onAnswer={onAnswer}
      question={question}
      renderPlayer={() => null}
    />);

    const answerInputs = screen.find(`input`);
    const answerOne = answerInputs.at(0);

    answerOne.simulate(`change`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
  });
});
