import { takeLatest } from 'redux-saga/effects';
import { SONG_SEARCH } from '../action/SongSearch';
import { songSearchListSaga } from './SongSearch';

export function* watcherSaga() {
  yield takeLatest(SONG_SEARCH, songSearchListSaga);
}
