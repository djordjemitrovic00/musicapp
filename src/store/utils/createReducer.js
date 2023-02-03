const createReducer = (handlers, initialState) => {
  return (state = initialState, action) => {
    const reducer = handlers[action.type];

    if (!reducer) {
      return state;
    }

    return reducer(state, action);
  };
};

export default createReducer;
