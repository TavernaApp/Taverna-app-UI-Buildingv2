// reducers.js

const initialState = {
    userData: null,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_USER_DATA':
        return {
          ...state,
          userData: action.payload,
        };
        case 'CLEAR_USER_DATA':
          return {
            ...state,
            userData: null,
          };
      default:
        return state;
    }
  };
  