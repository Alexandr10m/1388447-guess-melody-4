import React from "react";
import renderer from "react-test-renderer";
import GameOverScreen from "./game-over-screen";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";


describe(`Snapshot of GameOverScreen`, () =>{
  it(`Should GameOverScreen render correctly`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <GameOverScreen
              onReplayButtonClick={noop}
            />
          </Router>)
          .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
