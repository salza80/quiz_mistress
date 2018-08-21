import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { getQuiz, getAnswers } from '../selectors'
import { apiFetch, apiUpdate } from '../../modules/backend.js'
import Preload from 'image-preloader-promise'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchData(action) {
   try {
      const data = yield call(apiFetch, 'quizzes/' + action.url_name + '.json?')
      var images = [];
      for( var i=0; i<data.questions.length; i++) {
        try{
          images.push(data.questions[i].image.image_file.url)
        }catch(e){}
      } 
      yield call(Preload.preloadImages, images)
      yield put({type: "DATA_LOADED", data: data})
   } catch (e) {
      yield put({type: "DATA_LOAD_FAILED", message: e.message})
   }
}

function* finishQuiz(action) {
   try {
    const quiz = yield select(getQuiz)
    const previewParam = quiz.preview ? 'preview=preview' : ''
    const answers = yield select(getAnswers)
    const url = `quizzes/${quiz.url_name}.json${previewParam}` 
    
    const postResults = {
      result: {
        answers: answers
      }
    }

    const result = yield call(apiUpdate, url, postResults)
    window.location = result.redirect_to
    // yeild put({type: "SHOW_RESULT", results: result})

   } catch (e) {
      // yield put({type: "FINISH_QUIZ_FAILED", message: e.message})
   }
}

function* quizSaga() {
  yield takeLatest("LOAD_DATA", fetchData)
  yield takeLatest("FINISH_QUIZ", finishQuiz)
}

export default quizSaga
