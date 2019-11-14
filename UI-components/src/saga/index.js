import { all } from 'redux-saga/effects';
import checkFiles  from './files.saga';

export default function* rootSaga() {
  yield checkFiles();
}
