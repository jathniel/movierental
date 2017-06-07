import React from 'react';
import ReactDom from 'react-dom';
const App = () => {
  return (
    <h2>
      Hello React component
    </h2>
  );
};
ReactDom.render(
  <App />,
  document.getElementById('root')
);
