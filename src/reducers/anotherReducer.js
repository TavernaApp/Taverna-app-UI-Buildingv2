// anotherReducer.js
// Define initial state
const initialState = {
    selectedBar: null,
};

const SET_SELECTED_BAR = 'SET_SELECTED_BAR';

export const setSelectedBar = (bar) => ({
    type: SET_SELECTED_BAR,
    payload: bar,
});

const anotherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_BAR:
            return { ...state, selectedBar: action.payload };
        default:
            return state;
    }
};

export default anotherReducer;
