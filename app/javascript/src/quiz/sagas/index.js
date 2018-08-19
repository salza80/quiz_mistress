import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import backend from '../../modules/backend.js'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchData(action) {
   try {
      console.log(action)
      const data = yield call(backend.fetch, 'quizzes/' + action.url_name + '.json?');
      console.log(data)
      yield put({type: "DATA_LOADED", data: data});
   } catch (e) {
      yield put({type: "DATA_LOAD_FAILED", message: e.message});
   }
}

function* quizSaga() {
  yield takeLatest("LOAD_DATA", fetchData)
}

export default quizSaga;
