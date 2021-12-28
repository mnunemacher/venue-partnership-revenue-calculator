import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const widgetDivs = document.querySelectorAll('.vprc_widget');

widgetDivs.forEach((Div) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    Div
  );
});

