import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import DamageMeter from './components/DamageMeter';
import store from './store/store'


function App() {
  return (
    <Provider store={store}>
      <DamageMeter />
    </Provider>
  );
}

export default App;


