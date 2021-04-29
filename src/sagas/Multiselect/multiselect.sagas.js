import {put, all, call, takeEvery, delay, takeLatest} from 'redux-saga/effects';

import {options} from '../../constants';
import * as MULTISELECT_SAGA_TYPES from './types';
import * as MULTISELECT_ACTION_TYPES from '../../store/reducers/Multiselect/multiselect.types';

const ops = {};
options.forEach(option => {
  ops[option.id] = option;
})

function* loadItems() {
  yield put({type: MULTISELECT_ACTION_TYPES.LOADING_ITEMS_START});
  yield delay(100);
  yield put({type: MULTISELECT_ACTION_TYPES.LOADING_ITEMS_STOP, options:{...ops}});
}

function* onToggle({checked, id}) {
  if (checked) {
    yield put({type: MULTISELECT_ACTION_TYPES.PUSH_ITEM, payload: id});
  } else {
    yield put({type: MULTISELECT_ACTION_TYPES.PULL_ITEM, payload: id});
  }
}

function* reset() {
  yield put({type: MULTISELECT_ACTION_TYPES.RESET});
  yield delay(1);
  yield put({type: MULTISELECT_ACTION_TYPES.LOADING_ITEMS_STOP, options:{...ops}});
}


function* filterOptions({param}) {
  yield put({type: MULTISELECT_ACTION_TYPES.FILTER_OPTIONS, param});
}

export function* multiselectSagaWatcher() {
  yield all([
    takeEvery(MULTISELECT_SAGA_TYPES.LOADING_ITEMS_START, loadItems),
    takeEvery(MULTISELECT_SAGA_TYPES.ON_ITEM_TOGGLE, onToggle),
    takeEvery(MULTISELECT_SAGA_TYPES.RESET, reset),
    takeLatest(MULTISELECT_SAGA_TYPES.FILTER_OPTIONS, filterOptions)
  ]);
}