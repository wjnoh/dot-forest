import * as actionTypes from '../actionTypes/user';

// 로그인
export function fetchSignIn(payload) {
  return {
    type: actionTypes.FETCH_SIGN_IN,
    payload
  }
}

export function fetchSignInFulfilled(payload) {
  return {
    type: actionTypes.FETCH_SIGN_IN_FULFILLED,
    payload
  }
}

export function fetchSignInRejected(error) {
  return {
    type: actionTypes.FETCH_SIGN_IN_REJECTED,
    error
  }
}

// 로그아웃
export function signOut() {
  return {
    type: actionTypes.SIGN_OUT
  }
}

// 회원가입
export function fetchSignUp(payload) {
  return {
    type: actionTypes.FETCH_SIGN_UP,
    payload
  }
}

export function fetchSignUpFulfilled() {
  return {
    type: actionTypes.FETCH_SIGN_UP_FULFILLED
  }
}

export function fetchSignUpRejected(error) {
  return {
    type: actionTypes.FETCH_SIGN_UP_REJECTED,
    error
  }
}

// 회원가입 인증메일 재전송
export function fetchSendVerifyEmail() {
  return {
    type: actionTypes.FETCH_SEND_VERIFY_EMAIL
  }
}

export function fetchSendVerifyEmailFulfilled(payload) {
  return {
    type: actionTypes.FETCH_SEND_VERIFY_EMAIL_FULFILLED,
    payload
  }
}

export function fetchSendVerifyEmailRejected(error) {
  return {
    type: actionTypes.FETCH_SEND_VERIFY_EMAIL_REJECTED,
    error
  }
}

// 현재 유저정보 가져오기
export function fetchCurrentUser() {
  return {
    type: actionTypes.FETCH_CURRENT_USER
  }
}

export function fetchCurrentUserFulfilled(payload) {
  return {
    type: actionTypes.FETCH_CURRENT_USER_FULFILLED,
    payload
  }
}

export function fetchCurrentUserRejected(error) {
  return {
    type: actionTypes.FETCH_CURRENT_USER_REJECTED,
    error
  }
}