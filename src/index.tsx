import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ContactsProvider } from './context/contacts.context';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContactsProvider>
      <App />
    </ContactsProvider>
  </React.StrictMode>
);
