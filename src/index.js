import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './models/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App store={Store} />, document.getElementById('root'));
registerServiceWorker();
