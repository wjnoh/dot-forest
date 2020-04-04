import * as actionType from '../actionTypes/user';

const INITIAL_STATE = {
  currentUser: null
}

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    // 로그인
    case actionType.FETCH_SIGN_IN_FULFILLED: {
      return {
        ...state,
        currentUser: action.payload
      }
    }
    case actionType.FETCH_SIGN_IN_REJECTED: {
      return {
        ...state,
        error: action.error,
        currentUser: null
      }
    }

    // 로그아웃
    case actionType.SIGN_OUT: {
      localStorage.removeItem('jwtToken');
      return {
        ...state,
        currentUser: null
      }
    }

    // 회원가입
    case actionType.FETCH_SIGN_UP_REJECTED: {
      return {
        ...state,
        error: action.error,
        currentUser: null
      }
    }

    // 회원가입 인증메일 재전송
    case actionType.FETCH_SEND_VERIFY_EMAIL_FULFILLED: {
      return {
        ...state,
        currentUser: action.payload
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
        currentUser: action.payload
      }
    }
    case actionType.FETCH_CURRENT_USER_REJECTED: {
      return {
        ...state,
        error: action.error,
        currentUser: null
      }
    }

    default: {
      return state 
    }
  }
}