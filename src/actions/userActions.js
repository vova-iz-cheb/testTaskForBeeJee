import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../constants';

export const loginRequest = {
  type: LOGIN_REQUEST,
};

export const loginSuccess = ({ token }) => {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_SUCCESS,
  };
};

export const loginFailed = error => {
  return {
    type: LOGIN_FAILED,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
  };
};
