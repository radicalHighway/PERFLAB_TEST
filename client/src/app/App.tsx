import React from 'react';
import { Provider } from 'react-redux';
import { Router } from './router/Router';
import  store  from './store/store';


export function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
