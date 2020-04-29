import { call, put, takeLatest } from 'redux-saga/effects';
import history from '../../utils/history';
import { fetchGET, fetchPOST } from '../../utils/fetch';
import * as userActionCreators from '../actionCreators/user';
import * as userActionTypes from '../actionTypes/user';


// 로그인
function* fetchSignInSaga(action) {
  try {
    const { email, password } = action.payload;
    const { data: { jwtToken, user, message } } = yield call(fetchPOST, { url: '/users/signin', data: { email, password } });

    // 토큰은 로컬 스토리지에, 유저 정보는 Redux Store에
    localStorage.setItem('jwtToken', jwtToken);
    yield put(userActionCreators.fetchSignInFulfilled(user));
    
    alert(message);
    yield call(history.replace, '/');
  } catch (error) {
    alert(error.response.data.message);
    yield put(userActionCreators.fetchSignInRejected(error.response));
  }
}

// 회원가입
function* fetchSignUpSaga(action) {
  try {
    const { email, password, nickName } = action.payload;
    const { data: { message } } = yield call(fetchPOST, { url: '/users/signup', data: { email, password, nickName } });
    
    yield put(userActionCreators.fetchSignUpFulfilled());
    alert(message);
  } catch (error) {
    alert(error.response.data.message);
    yield put(userActionCreators.fetchSignUpRejected(error.response));
  }
}

// 회원가입 인증메일 재전송
function* fetchReSendVerifyEmailSaga(action) {
  try {
    const { email, password } = action.payload;
    const { data: { message } } = yield call(fetchPOST, { url: '/users/reSendVerifyEmail', data: { email, password } });

    yield put(userActionCreators.fetchReSendVerifyEmailFulfilled());
    alert(message);
  } catch (error) {
    alert(error.response.data.message);
    yield put(userActionCreators.fetchReSendVerifyEmailRejected(error.response));
  }
}

// 현재 유저정보 가져오기
function* fetchCurrentUserSaga() {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      const { data: { user } } = yield call(fetchGET, { url: '/users/current', jwtToken });
      yield put(userActionCreators.fetchCurrentUserFulfilled(user));
    } else {
      yield put(userActionCreators.fetchCurrentUserRejected({ message: '토큰이 없습니다.' }));
    }
  } catch (error) {
    alert('토큰이 만료되었습니다.');
    yield put(userActionCreators.fetchCurrentUserRejected(error.response));
  }
}

export default function* root() {
  yield takeLatest(userActionTypes.FETCH_SIGN_IN, fetchSignInSaga);
  yield takeLatest(userActionTypes.FETCH_SIGN_UP, fetchSignUpSaga);
  yield takeLatest(userActionTypes.FETCH_RE_SEND_VERIFY_EMAIL, fetchReSendVerifyEmailSaga);
  yield takeLatest(userActionTypes.FETCH_CURRENT_USER, fetchCurrentUserSaga);
}