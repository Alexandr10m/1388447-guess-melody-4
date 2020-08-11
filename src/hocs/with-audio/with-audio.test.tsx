import * as React from "react";
import * as renderer from "react-test-renderer";
import withAudio from "./with-audio";
import {noop} from "../../utils";


interface MockComponent {
  children: React.ReactNode;
}

const MockComponent = (props: MockComponent) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withAudio(MockComponent);

describe(`Snapshot of withAudio`, () => {
  it(`withAudio is rendered correctly`, () => {
    const tree = renderer
      .create((
        <MockComponentWrapped
          isPlaying={false}
          onPlayButtonClick={noop}
          src={``}
        />
      ), {
        createNodeMock() {
          return {};
        }
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
