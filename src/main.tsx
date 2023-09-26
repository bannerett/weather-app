import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '~/App';
import GeoPositionProvider from '~/providers/GeoPositionProvider';
import { store } from '~/store/store';

import '@fontsource/source-sans-pro';
import '~/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GeoPositionProvider>
        <App />
      </GeoPositionProvider>
    </Provider>
  </React.StrictMode>,
);
