import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//const root = ReactDOM.createRoot(document.getElementById('root'));

//*This redners the App component, if you don't run the app you won't see anything on localhost
ReactDOM.render(<App/>,document.getElementById('root')); //!this is React 17 which is out of date

// ! how the fuck does npx create-react app work? what is this file structure? why are they both called index.js?