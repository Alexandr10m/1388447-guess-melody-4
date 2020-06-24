import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../constants.js";


const INPUT_ID_PREFIX = `answer-`;

const getInputIndexById = (id) => {
  return Number(id.substring(INPUT_ID_PREFIX.length));
};

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [false, false, false, false],
    };
    this.handlerFormSubmit = this.handlerFormSubmit.bind(this);
  }

  handlerFormSubmit(evt) {
    const {onAnswer, question} = this.props;
    evt.preventDefault();
    onAnswer(question, this.state.answers);
  }

  handlerInputChange(evt) {
    const {answers: userAnswers} = this.state;
    const value = evt.target.checked;
    const i = getInputIndexById(evt.target.id);
    this.setState({
      answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
    });
  }

  render() {
    const {question} = this.props;
    const {answers: userAnswers} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form

          className="game__tracks"
          onSubmit={this.handlerFormSubmit}
        >

          {answers.map((answer, i) => (
            <div key={`${i}-${answer.src}`} className="track">
              <button className="track__button track__button--play" type="button"/>
              <div className="track__status">
                <audio
                  src={answer.src}
                />
              </div>
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                  id={`answer-${i}`}
                  checked={userAnswers[i]}
                  onChange={(evt) => {
                    const value = evt.target.checked;
                    this.setState({
                      answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
                    });
                  }}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}
GenreQuestionScreen.propTypes = {
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
export default GenreQuestionScreen;
