import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';

export const EditTask = () => {
  const { id } = useParams();
  let { text: taskText, status: taskStatus } = useSelector(store => {
    return store.tasks.tasks.find(item => item.id == id);
  });

  let flag = 0;
  const [isEditAdmin, changeIsEditAdmin] = useState(false);

  if (taskText.search(/(\*\*admin\*\*)$/) !== -1) {
    taskText = taskText.replace(/(\*\*admin\*\*)$/, '');
    flag = 1;
  }

  const [text, changeText] = useState(taskText);
  const [status, changeStatus] = useState(taskStatus);

  useEffect(() => {
    document.title = 'Edit task';
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    if (isEditAdmin || flag) {
      formData.append('text', text + '**admin**');
    } else {
      formData.append('text', text);
    }
    formData.append('status', status);
    formData.append('token', localStorage.getItem('token'));

    fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=cherepkov`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'ok') {
          history.push('/');
        } else {
          dispatch(logout());
          history.replace('/login');
        }
      })
      .catch(err => console.log('Error: ', err));
  };

  return (
    <form>
      <h2>Edit:</h2>
      <label htmlFor="text">Text</label>
      <br />
      <textarea
        className="w100"
        id="text"
        value={text}
        onChange={e => {
          changeText(e.currentTarget.value);
          changeIsEditAdmin(true);
        }}
        rows={2}
      ></textarea>
      <br />
      <h3>Status:</h3>
      <input
        type="radio"
        id="status0"
        value="0"
        checked={status == '0'}
        onChange={e => changeStatus(e.currentTarget.value)}
      />{' '}
      <label htmlFor="status0">В процессе</label>
      <br />
      <input
        type="radio"
        id="status10"
        value="10"
        checked={status == '10'}
        onChange={e => changeStatus(e.currentTarget.value)}
      />{' '}
      <label htmlFor="status10">Выполнено</label>
      <br />
      <input className="btn btn-green" type="submit" value="Изменить" onClick={submitHandler} />
    </form>
  );
};
