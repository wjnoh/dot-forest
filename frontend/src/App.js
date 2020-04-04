import React from 'react';
import { Router } from 'react-router-dom';
import RouterComponent from './RouterComponent';
import history from './utils/history';

// redux
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import rootSaga from "./store/sagas";
const store = configureStore();
store.runSaga(rootSaga);

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    </Router>
  );
}

export default App;
