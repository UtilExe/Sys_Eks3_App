import * as React from 'react';
import 'react-native-gesture-handler';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './src/redux/saga';
import reducer from './src/redux/reducer';
import AppNavigator from './AppNavigator';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcherSaga);

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
export default App;
