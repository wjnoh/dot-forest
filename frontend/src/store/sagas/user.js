import { call, put, takeLatest } from "redux-saga/effects";
import history from '../../utils/history';
import { fetchPOST } from '../../utils/fetch';
import * as userActionCreators from '../actionCreators/user';
import * as userActionTypes from '../actionTypes/user';


// 로그인
function* fetchSignInSaga(action) {
  try {
    const { email, password } = action.payload;
    const { data: { jwtToken, user } } = yield call(fetchPOST, { url: '/users/signin', data: { email, password } });

    // 토큰은 로컬 스토리지에, 유저 정보는 Redux Store에
    localStorage.setItem('jwtToken', jwtToken);
    yield put(userActionCreators.fetchSignInFulfilled(user));
    
    alert(`${user.nickName}님 환영합니다.`)
    yield call(history.replace, '/');
  } catch(error) {
    alert(error.response.data.message);
    yield put(userActionCreators.fetchSignInRejected(error.response));
  }
}

export default function* root() {
  yield takeLatest(userActionTypes.FETCH_SIGN_IN, fetchSignInSaga);
}