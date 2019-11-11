/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CreateTaskForm } from './CreateTaskForm';
import { Pagination } from '../components/Pagination';
import { LoadBox } from '../components/LoadBox';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTasks,
  fetchTasksSuccess,
  fetchTasksFailed,
  changePage,
  changeField,
} from '../actions/taskActions';

export const Home = () => {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  const dispatch = useDispatch();

  const { sort_field, sort_direction, page, tasks, count, isLoading } = useSelector(
    store => store.tasks
  );
  const login = useSelector(store => store.user.login);

  const tasksRequest = () => {
    dispatch(fetchTasks());

    fetch(
      `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=cherepkov&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`,
      {
        method: 'GET',
      }
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 'ok') {
          const { tasks, total_task_count: count } = result.message;
          dispatch(fetchTasksSuccess(tasks, count));
        } else {
          dispatch(fetchTasksFailed());
        }
      })
      .catch(err => console.log('Error: ', err));
  };

  useEffect(() => {
    tasksRequest();
  }, [sort_field, sort_direction, page]);

  const sort = e => {
    e.preventDefault();

    if (e.target.dataset.field == sort_field) {
      const direction = sort_direction === 'asc' ? 'desc' : 'asc';
      dispatch(changeField(sort_field, direction));
    } else {
      dispatch(changeField(e.target.dataset.field, sort_direction));
    }
  };

  return (
    <div>
      {isLoading && <LoadBox />}
      <CreateTaskForm tasksRequest={tasksRequest} />
      <h2>Tasks:</h2>
      {count === 0 ? (
        <p>К сожалению задач нет!</p>
      ) : (
        <table className="tasks">
          <thead>
            <tr>
              <th className="small">
                <a
                  data-field="username"
                  data-sort="asc"
                  href="#"
                  onClick={sort}
                  className={sort_field == 'username' ? 'tasks__sort active' : 'tasks__sort'}
                >
                  Username {sort_field == 'username' && sort_direction == 'asc' && '▼'}
                  {sort_field == 'username' && sort_direction == 'desc' && '▲'}
                </a>
              </th>
              <th className="small">
                <a
                  data-field="email"
                  data-sort="asc"
                  href="#"
                  onClick={sort}
                  className={sort_field == 'email' ? 'tasks__sort active' : 'tasks__sort'}
                >
                  Email {sort_field == 'email' && sort_direction == 'asc' && '▼'}
                  {sort_field == 'email' && sort_direction == 'desc' && '▲'}
                </a>
              </th>
              <th className="big">Text</th>
              <th className="small">
                <a
                  data-field="status"
                  data-sort="asc"
                  href="#"
                  onClick={sort}
                  className={sort_field == 'status' ? 'tasks__sort active' : 'tasks__sort'}
                >
                  Status {sort_field == 'status' && sort_direction == 'asc' && '▼'}
                  {sort_field == 'status' && sort_direction == 'desc' && '▲'}
                </a>
              </th>
              {login && <th>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.map(item => {
              let text = '';
              if (item.text.search(/(\*\*admin\*\*)$/) == -1) text = item.text;
              else
                text = (
                  <>
                    {item.text.replace(/(\*\*admin\*\*)$/, '')}
                    <div className="editAdmin__wrapper">
                      <span className="editAdmin">Отредактировано админом</span>
                    </div>
                  </>
                );

              return (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{text}</td>
                  <td>{item.status ? 'Выполнено' : 'В процессе'}</td>
                  {login && (
                    <td>
                      <NavLink to={'/edit/' + item.id}>
                        <i className="icon-pencil"></i>
                      </NavLink>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {count > 3 && (
        <Pagination page={page} count={count} dispatch={dispatch} changePage={changePage} />
      )}
    </div>
  );
};
