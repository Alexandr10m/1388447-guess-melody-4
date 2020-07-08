import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.GAME;

const getStep = (state) => state[NAME_SPACE].step;
const getMistakes = (state) => state[NAME_SPACE].mistakes;
const getMaxMistakes = (state) => state[NAME_SPACE].maxMistakes;


export {getStep, getMistakes, getMaxMistakes};
