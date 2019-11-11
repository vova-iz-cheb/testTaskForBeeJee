import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../constants';

const initialState = {
  login: false,
  error: {},
  isLoading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        login: 'admin',
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
