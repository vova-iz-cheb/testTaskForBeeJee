import React from 'react';
import PropTypes from 'prop-types';

export const Pagination = props => {
  const { count, dispatch, changePage } = props;
  const page = Math.ceil(count / 3);
  const onHadlerClick = e => {
    e.preventDefault();

    dispatch(changePage(e.target.innerText));
  };

  let buttonList = [];

  for (let i = 1; i <= page; i++) {
    buttonList.push(
      <li key={i}>
        <a
          href="#"
          onClick={onHadlerClick}
          className={props.page == i ? 'pag__link active' : 'pag__link'}
        >
          {i}
        </a>
      </li>
    );
  }

  return <ul className="pag">{buttonList}</ul>;
};

Pagination.propTypes = {
  count: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};
