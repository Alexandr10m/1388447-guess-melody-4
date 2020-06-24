import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../constants";
import AudioPlayer from "../audio-player/audio-player.jsx";


const INPUT_ID_PREFIX = `answer-`;

const getInputIndexById = (id) => {
  return Number(id.substring(INPUT_ID_PREFIX.length));
};

const ArtistQuestionScreen = (props) => {
  const {onAnswer, question} = props;
  const {answers, song} = question;

  const handlerInputChange = (evt) => {
    evt.preventDefault();
    const index = getInputIndexById(evt.target.id);
    onAnswer(question, answers[index]);
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <AudioPlayer
            isPlaying={true}
            src={song.src}
          />
        </div>
      </div>
      <form className="game__artist">

        {answers.map((answer, i) => (
          <div key={answer.artist} className="artist">
            <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i}`} id={`answer-${i}`}
              onChange={handlerInputChange}
            />
            <label className="artist__name" htmlFor={`answer-${i}`}>
              <img className="artist__picture" src={answer.picture} alt={answer.artist} />
              {answer.artist}
            </label>
          </div>
        ))}

      </form>
    </section>
  );
};


ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};

export default ArtistQuestionScreen;

