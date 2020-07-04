import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../constants.js";


const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false),
      };

      this.handlerFormSubmit = this.handlerFormSubmit.bind(this);
      this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    handlerFormSubmit() {
      const {onAnswer, question} = this.props;
      const {answers} = this.state;

      onAnswer(question, answers);
    }

    handlerInputChange(i, value) {
      const {answers} = this.state;

      const userAnswers = answers.slice();
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
          onAnswer={this.handlerFormSubmit}
          onChange={this.handlerInputChange}
        >
        </Component>
      );
    }
  }

  WithUserAnswer.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
      })).isRequired,
      genre: PropTypes.string.isRequired,
      type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    }).isRequired,
  };

  return WithUserAnswer;
};


export default withUserAnswer;
