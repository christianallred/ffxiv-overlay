import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import DamageMeter from './components/DamageMeter';
import store from './store/store'

import {handleEventsListner} from './store/eventListeners'

handleEventsListner(store.dispatch, store.getState)

function App() {
  return (
    <Provider store={store}>
      <DamageMeter />
    </Provider>
  );
}

export default App;


