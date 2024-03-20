import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type react from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persister, store } from '@/app/providers/StoreProvider/config/store';
import RootRouter from '@/app/RootRouter';

const App: react.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter>
          <MantineProvider defaultColorScheme="dark">
            <Notifications position="top-right" />
            <RootRouter />
          </MantineProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
