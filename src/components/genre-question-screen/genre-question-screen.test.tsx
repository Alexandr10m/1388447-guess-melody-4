import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionScreen from "./genre-question-screen";
import {noop} from "../../utils";
import {GameType, QustionGenre} from "../../types";


const question: QustionGenre = {
  type: GameType.GENRE,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }],
};

describe(`Snapshot of GenreQuestionScreen`, () => {
  it(`GenreQuestionScreen is rendered correctly`, () => {
    const tree = renderer.create((
      <GenreQuestionScreen
        question={question}
        onAnswer={noop}
        renderPlayer={()=>null}
        onChange={noop}
        userAnswers={[false, false, false, false]}
      />
    ), {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
