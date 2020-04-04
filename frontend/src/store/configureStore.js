import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware, { END }  from 'redux-saga';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export default () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () =>  store.dispatch(END);
  return store;
}