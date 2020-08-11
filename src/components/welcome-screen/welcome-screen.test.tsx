import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";
import {noop} from "../../utils";


describe(`Snapshot of WelcomScreen`, () => {
  it(`WelcomeScreenComponent should render`, () => {
    const tree = renderer
      .create(
          <WelcomeScreen
            errorsCount={3}
            onWelcomeButtonClick={noop}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
