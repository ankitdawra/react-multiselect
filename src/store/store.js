import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleeare from 'redux-saga';

import rootReducer from './reducers/rootReducer';
import rootSaga from '../sagas/rootSagas';

const sagaMiddleWare = createSagaMiddleeare();
const appStore = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);

export default appStore;