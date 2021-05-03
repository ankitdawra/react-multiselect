import {put, all, call, takeEvery, delay, takeLatest} from 'redux-saga/effects';

import {options} from '../../constants';
import * as MULTISELECT_SAGA_TYPES from './types';
import * as MULTISELECT_ACTION_TYPES from '../../store/reducers/Multiselect/multiselect.types';

const ops = {};
options.forEach(option => {
  ops[option.id] = {...option};
  // ops[option.id].cites = {}
  // if (option.cites && option.cites.length) {
  //   option.cites.map(cityId => {
  //     ops[option.id].cites[cityId] = options.find(op => op.id === cityId)
  //   })
  // }
})

function* loadItems() {
  yield put({type: MULTISELECT_ACTION_TYPES.LOADING_ITEMS_START});
  yield delay(100);
  yield put({type: MULTISELECT_ACTION_TYPES.LOADING_ITEMS_STOP, options:{...ops}});
}

function* onToggle({checked, id, parentId}) {
  const payload = {
    id,
    parentId
  }
  if (checked) {
    yield put({type: MULTISELECT_ACTION_TYPES.PUSH_ITEM, payload});
  } else {
    yield put({type: MULTISELECT_ACTION_TYPES.PULL_ITEM, payload});
  }
}

function* reset() {
  yield put({type: MULTISELECT_ACTION_TYPES.RESET});
  yield delay(1);
  yield put({type: MULTISELECT_ACTION_TYPES.LOADING_ITEMS_STOP, options:{...ops}});
}


function* filterOptions({payload}) {
  yield put({
    type: MULTISELECT_ACTION_TYPES.FILTER_OPTIONS,
    payload
  });
}

function* changeViewBy({viewBy}) {
  yield put({type:MULTISELECT_ACTION_TYPES.CHANGE_VIEW_BY, viewBy})
}

export function* multiselectSagaWatcher() {
  yield all([
    takeEvery(MULTISELECT_SAGA_TYPES.LOADING_ITEMS_START, loadItems),
    takeEvery(MULTISELECT_SAGA_TYPES.ON_ITEM_TOGGLE, onToggle),
    takeEvery(MULTISELECT_SAGA_TYPES.RESET, reset),
    takeLatest(MULTISELECT_SAGA_TYPES.FILTER_OPTIONS, filterOptions),
    takeLatest(MULTISELECT_SAGA_TYPES.CHANGE_VIEW_BY, changeViewBy),
  ]);
}