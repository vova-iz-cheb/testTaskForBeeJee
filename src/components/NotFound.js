import React, { useEffect } from 'react';

export const NotFound = () => {
  useEffect(() => {
    document.title = '404. Page is not found!';
  }, []);

  return <h1>К сожалению страница не найдена.</h1>;
};
