import {createSelector} from "reselect";
import NameSpace from "../name-space";


const NAME_SPACE = NameSpace.DATA;
const randomFilter = () => Math.random() > 0.5;

const getQuestions = (state) => state[NAME_SPACE].questions;

const getArtistQuestions = createSelector(
    getQuestions,
    randomFilter,
    (resultOne, resultTwo) => resultOne.filter((it) => resultTwo && it.type === `artist`)
);

const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => questions.filter((it) => it.type === `genre`)
);


export {getQuestions, getArtistQuestions, getGenreQuestions};
