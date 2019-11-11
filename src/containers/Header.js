import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

export const Header = () => {
  const login = useSelector(store => store.user.login);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickHandler = e => {
    e.preventDefault();

    dispatch(logout());

    history.replace('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <NavLink to="/">Home</NavLink>
          </div>
          <div className="col-auto">
            {login ? (
              <span>
                {login}{' '}
                <a href="#" onClick={onClickHandler}>
                  Выйти
                </a>
              </span>
            ) : (
              <NavLink to="/login">Войти</NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
