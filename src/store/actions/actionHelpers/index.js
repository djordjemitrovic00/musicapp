export const FETCH = '[FETCH]';
export const UPDATE = '[UPDATE]';
export const SUCCESS = '[SUCCESS]';
export const SET = '[SET]';
export const ERROR = '[ERROR]';
export const SUBMIT = '[SUBMIT]';
export const CLEAR = '[CLEAR]';
export const DELETE = '[DELETE]';
export const LOADING = '[LOADING]';

const createType = (typeDescription) => (type) => `${typeDescription}${type}`;

export const createFetchType = createType(FETCH);
export const createUpdateType = createType(UPDATE);
export const createSuccessType = createType(SUCCESS);
export const createSetType = createType(SET);
export const createErrorType = createType(ERROR);
export const createSubmitType = createType(SUBMIT);
export const createClearType = createType(CLEAR);
export const createDeleteType = createType(DELETE);
export const createLoadingType = createType(LOADING);
