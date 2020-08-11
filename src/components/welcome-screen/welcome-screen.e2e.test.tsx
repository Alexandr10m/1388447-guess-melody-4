import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import WelcomeScreen from "./welcome-screen";


configure({adapter: new Adapter()});

describe(`E2E of WelcomeScreen`, () => {
  it(`Should button of WelcomeScreen be pressed`, () => {
    const onWelcomeButtonClick = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen
          errorsCount={3}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
    );

    const welcomeButton = welcomeScreen.find(`button.welcome__button`);
    welcomeButton.simulate(`click`);
    expect(onWelcomeButtonClick.mock.calls.length).toBe(1);
  });
});
