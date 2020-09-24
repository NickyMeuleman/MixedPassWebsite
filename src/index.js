import React from 'react';
import { Index } from './app';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<React.StrictMode>
  <Index />
</React.StrictMode>, document.getElementById('root')
);
serviceWorker.register();