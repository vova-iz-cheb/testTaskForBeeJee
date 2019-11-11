import React from 'react';

export const Main = props => (
  <div className="container grow1">
    <main className="main">
      <div className="row">
        <div className="col-12">{props.children}</div>
      </div>
    </main>
  </div>
);
