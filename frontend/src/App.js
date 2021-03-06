import React from 'react';

import Routes from './routes';

import logo from './assets/logo.svg';

import './App.css';

export function App() {

  return(
    <div className="container">

      <img src={logo} alt="aircnc"/>

      <div className="content">
          <Routes />
      </div>

    </div>
  );

}

export default App;