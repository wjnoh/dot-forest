import * as actionType from '../actionTypes/user';
import history from '../../utils/history';

const INITIAL_STATE = {
  isSignIn: Boolean(localStorage.getItem('jwtToken')),
  currentUser: null,
}

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    // 로그인
    case actionType.FETCH_SIGN_IN_FULFILLED: {
      return {
        ...state,
        isSignIn: true,
        currentUser: action.payload
      }
    }
    case actionType.FETCH_SIGN_IN_REJECTED: {
      return {
        ...state,
        error: action.error,
        isSignIn: false,
        currentUser: null
      }
    }

    // 로그아웃
    case actionType.SIGN_OUT: {
      localStorage.removeItem('jwtToken');
      history.push('/');
      
      return {
        ...state,
        isSignIn: false,
        currentUser: null
      }
    }

    // 회원가입
    case actionType.FETCH_SIGN_UP_REJECTED: {
      return {
        ...state,
        error: action.error,
        isSignIn: false,
        currentUser: null
      }
    }

    // 회원가입 인증메일 재전송
    case actionType.FETCH_SEND_VERIFY_EMAIL_FULFILLED: {
      return {
        ...state
      }
    }
    case actionType.FETCH_SEND_VERIFY_EMAIL_REJECTED: {
      return {
        ...state,
        error: action.error
      }
    }

    // 현재 유저정보 가져오기
    case actionType.FETCH_CURRENT_USER_FULFILLED: {
      return {
        ...state,
        isSignIn: true,
        currentUser: action.payload
      }
    }
    case actionType.FETCH_CURRENT_USER_REJECTED: {
      localStorage.removeItem('jwtToken');
      history.push('/');

      return {
        ...state,
        error: action.error,
        isSignIn: false,
        currentUser: null
      }
    }

    default: {
      return state 
    }
  }
}