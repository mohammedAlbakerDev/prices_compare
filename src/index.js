// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css'
// import LocalStorageProvider from './context/localStorageContext';

// ReactDOM.render(
//   <LocalStorageProvider>

//       <App />
//   </LocalStorageProvider>,
//   document.getElementById('root')
// );
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import LocalStorageProvider from './context/localStorageContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <LocalStorageProvider>
    <App />
  </LocalStorageProvider>,
  document.getElementById('root')
);

// Register the service worker
serviceWorkerRegistration.register();
