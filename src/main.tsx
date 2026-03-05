import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
// import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// ...existing code...

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

let persistor = null;
if (typeof window !== 'undefined') {
  persistor = persistStore(store);
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      ) : (
        <App />
      )}
    </Provider>
  </React.StrictMode>
);
