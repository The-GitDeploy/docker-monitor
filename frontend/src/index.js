import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { SyncStateProvider } from './SyncState';


ReactDOM.render(
  <React.StrictMode>
    <SyncStateProvider>
      <App />
    </SyncStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
