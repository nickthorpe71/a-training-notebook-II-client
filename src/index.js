import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MainProvider } from './MainContext';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <MainProvider>
      <App />
    </MainProvider>
  </BrowserRouter>,
  document.getElementById('root')
);