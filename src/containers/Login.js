import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginRequest, loginSuccess, loginFailed } from '../actions/userActions';
import { LoadBox } from '../components/LoadBox';

export const Login = () => {
  const { error, isLoading } = useSelector(store => store.user);

  const [errorLogin, setErrorLogin] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [login, onChangeLogin] = useState('');
  const [password, onChangePassword] = useState('');

  useEffect(() => {
    document.title = 'Вход';
  }, []);

  useEffect(() => {
    setErrorLogin(error.username || '');
    setErrorPassword(error.password || '');
  }, [error.username, error.password]);

  const dispatch = useDispatch();

  const history = useHistory();

  const submitHandler = e => {
    e.preventDefault();

    dispatch(loginRequest);

    const formData = new FormData();
    formData.append('username', login);
    formData.append('password', password);

    fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=cherepkov', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'ok') {
          dispatch(loginSuccess(result.message));
          history.push('/');
        } else {
          dispatch(loginFailed(result.message));
        }
      })
      .catch(err => console.log('Error: ', err));
  };

  return (
    <form>
      {isLoading && <LoadBox />}
      {errorLogin ? <div className="error">{errorLogin}</div> : null}
      <label htmlFor="login">Login</label>
      <br />
      <input
        className={errorLogin ? 'input-error' : null}
        type="text"
        id="login"
        value={login}
        onChange={e => onChangeLogin(e.currentTarget.value)}
      />
      <br />
      {errorPassword ? <div className="error">{errorPassword}</div> : null}
      <label htmlFor="password">Password</label>
      <br />
      <input
        className={errorPassword ? 'input-error' : null}
        type="password"
        id="password"
        value={password}
        onChange={e => onChangePassword(e.currentTarget.value)}
      />
      <br />
      <input className="btn btn-green" type="submit" value="Войти" onClick={submitHandler} />
    </form>
  );
};
