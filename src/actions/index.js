export const addData = (data) => ({
    type: 'ADD_DATA',
    payload: data,
  });

export const addUserData = (userData) => ({
  type: 'ADD_USER_DATA',
  payload: userData,
});

// In your Redux action file, e.g., actions/userActions.js

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});
