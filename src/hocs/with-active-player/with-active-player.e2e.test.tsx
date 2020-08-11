import * as React from "react";
import {shallow} from "enzyme";
import withActivePlayer from "./with-active-player";


const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it.skip(`Should `, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activePlayer).toEqual(-1);
});
