import React from "react";
import renderer from "react-test-renderer";
import GameOverScreen from "./game-over-screen.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";


describe(`Snapshot of GameOverScreen`, () =>{
  it(`Should GameOverScreen render correctly`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <GameOverScreen
              onReplayButtonClick={() => {}}
            />
          </Router>)
          .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
