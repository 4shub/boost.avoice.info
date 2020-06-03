import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const props = (window as any).__APP_PROPS__;

ReactDOM.hydrate(<App {...props} />, document.getElementById('app'));
