import * as React from "react";
import {QustionArtist, AnswerArtist} from "../../types";


const INPUT_ID_PREFIX = `answer-`;

const getInputIndexById = (id: string) => {
  return Number(id.substring(INPUT_ID_PREFIX.length));
};

interface Props {
  onAnswer: (question: QustionArtist, answer: AnswerArtist) => void;
  question: QustionArtist;
  renderPlayer: (string, number) => React.ReactNode;
}

const ArtistQuestionScreen: React.FunctionComponent<Props> = (props: Props) => {

  const {question, renderPlayer, onAnswer} = props;
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
          {renderPlayer(song.src, 0)}
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


export default ArtistQuestionScreen;

