import { put, takeLatest, all, call } from 'redux-saga/effects';
import { GET_ALL_IMAGES, IMAGES_RECEIVED } from '../constants/AppConstants';
import * as api from '../api/api';

function* fetchImages() {
  const response = yield call(api.getAllImages);
  yield put({ type: IMAGES_RECEIVED, imageData: JSON.parse(response.text), });
}

function* actionWatcher() {
  yield takeLatest(GET_ALL_IMAGES, fetchImages);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
