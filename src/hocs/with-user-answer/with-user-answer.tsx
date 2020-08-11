import React, {PureComponent} from "react";
import {QustionGenre, AnswerArtist} from "../../types";
import {Subtract} from "utility-types";


interface Props {
  question: QustionGenre;
  onAnswer: (question: QustionGenre, answers: Answer) => void;
}

interface State {
  answers: Answer;
}

interface InjectedProps  {
  userAnswers: Answer;
  onAnswer: () => void;
  onChange: (answerIndex: number, value: boolean) => void;
}

type Answer = boolean[];

const withUserAnswer = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithUserAnswer extends PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false),
      };

      this.handleAnswer = this.handleAnswer.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleAnswer() {
      const {onAnswer, question} = this.props;
      const {answers} = this.state;

      onAnswer(question, answers);
    }

    handleChange(i, value) {
      const {answers} = this.state;

      const userAnswers = answers.slice(0);
      userAnswers[i] = value;

      this.setState({
        answers: userAnswers,
      });
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={answers}
          onAnswer={this.handleAnswer}
          onChange={this.handleChange}
        />
      );
    }
  }

  return WithUserAnswer;
};


export default withUserAnswer;
