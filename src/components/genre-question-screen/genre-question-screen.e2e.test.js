import React from "react";
import {mount} from "enzyme";
import GenreQuestionScreen from "./genre-question-screen.jsx";


const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

describe(`E2E test of GenreQuestionScreen`, () => {
  it(`When user answers genre question form is not sent`, () => {
    const {question} = mock;
    const onAnswer = jest.fn();
    const genreQuestion = mount(<GenreQuestionScreen
      onAnswer={onAnswer}
      question={question}
      renderPlayer={() => {}}
      onChange={()=>{}}
      userAnswers={[false, false, false, false]}
    />);

    const form = genreQuestion.find(`form`);
    const formSendPrevention = jest.fn();
    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
    const {question} = mock;
    const onAnswer = jest.fn((...args) => [...args]);
    const userAnswer = [true, false, false, false];

    const genreQuestion = mount(<GenreQuestionScreen
      onAnswer={onAnswer}
      question={question}
      renderPlayer={() => {}}
      onChange={() => {}}
      userAnswers={userAnswer}
    />);

    const form = genreQuestion.find(`form`);
    const inputTwo = genreQuestion.find(`input`).at(0);

    inputTwo.simulate(`change`, {target: {id: `0`, checked: true}});
    form.simulate(`submit`, {preventDefault() {}});

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toEqual(void 0);

    expect(
        genreQuestion.find(`input`).map((it) => it.prop(`checked`))
    ).toEqual(userAnswer);
  });
});
