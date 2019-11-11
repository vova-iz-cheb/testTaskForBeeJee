import {
  FECTH_TASKS_REQEST,
  FECTH_TASKS_SUCCESS,
  FECTH_TASKS_FAILED,
  CHANGE_PAGE,
  CHANGE_FIELD,
} from '../constants';

export const fetchTasks = () => {
  return {
    type: FECTH_TASKS_REQEST,
  };
};

export const fetchTasksSuccess = (tasks, count) => {
  return {
    type: FECTH_TASKS_SUCCESS,
    tasks,
    count,
  };
};

export const fetchTasksFailed = () => {
  return {
    type: FECTH_TASKS_FAILED,
  };
};

export const changePage = page => {
  return {
    type: CHANGE_PAGE,
    page,
  };
};

export const changeField = (field, direction) => {
  return {
    type: CHANGE_FIELD,
    field,
    direction,
  };
};
