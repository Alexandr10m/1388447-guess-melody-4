import NameSpace from "../name-space";


const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;


export {getAuthorizationStatus};
