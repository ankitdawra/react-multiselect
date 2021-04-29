import { fork, all } from 'redux-saga/effects';

import {multiselectSagaWatcher} from './Multiselect/multiselect.sagas';

// import { shopSagaWatcher } from './Shop/Shop.sagas';
// import { loginWatcher } from './Login/Login.sagas';

export default function* rootSaga() {
  yield all([
    fork(multiselectSagaWatcher)
  ])
}