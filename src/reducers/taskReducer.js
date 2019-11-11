import {
  FECTH_TASKS_REQEST,
  FECTH_TASKS_SUCCESS,
  FECTH_TASKS_FAILED,
  CHANGE_PAGE,
  CHANGE_FIELD,
} from '../constants';

const initialState = {
  sort_field: 'id',
  sort_direction: 'asc',
  page: '1',
  tasks: [],
  count: 0,
  isLoading: false,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case FECTH_TASKS_REQEST:
      return {
        ...state,
        isLoading: true,
      };
    case FECTH_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: action.tasks,
        count: action.count,
      };
    case FECTH_TASKS_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case CHANGE_FIELD:
      return {
        ...state,
        sort_field: action.field,
        sort_direction: action.direction,
      };
    default:
      return state;
  }
};

export default tasks;
