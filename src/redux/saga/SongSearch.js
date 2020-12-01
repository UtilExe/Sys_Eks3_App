import { put, call } from 'redux-saga/effects';
import { songSearchApi } from '../../Api';

import idx from 'idx';
import {
  SONG_SEARCH_ERROR,
  SONG_SEARCH_SUCCESSFUL,
} from '../action/SongSearch';

export function* songSearchListSaga(action) {
  try {
    const res = yield call(songSearchApi, action.data);

    const status = idx(res, (_) => _.status);

    if (status === 200) {
      yield put({ type: SONG_SEARCH_SUCCESSFUL, res });
      action.callBack(status);
    } else {
      yield put({ type: SONG_SEARCH_ERROR, res });
      action.callBack();
    }
  } catch (error) {
    yield put({ type: SONG_SEARCH_ERROR, error });
    action.callBack(error);
  }
}
