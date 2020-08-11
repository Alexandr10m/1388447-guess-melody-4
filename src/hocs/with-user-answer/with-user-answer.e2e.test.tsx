import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import withUserAnswer from "./with-user-answer";
import {GameType, QustionGenre} from "../../types";
import {noop} from "../../utils";


configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapper = withUserAnswer(MockComponent);

const question: QustionGenre = {
  type: GameType.GENRE,
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
};

describe(`E2E test withUserAnswer`, () => {
  it(`Should change answer`, () => {
    const wrapper = shallow(
        <MockComponentWrapper
          question={question}
          onAnswer={noop}
        />);


    expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

    wrapper.props().onChange(0, true);
    expect(wrapper.props().userAnswers).toEqual([true, false, false, false]);

    wrapper.props().onChange(0, false);
    expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

    wrapper.props().onChange(1, true);
    expect(wrapper.props().userAnswers).toEqual([false, true, false, false]);
  });
});
