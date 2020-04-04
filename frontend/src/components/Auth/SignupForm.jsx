import React from 'react';
import { useDispatch } from 'react-redux';
import * as userActionCreators from '../../store/actionCreators/user';
import useInput from '../../hooks/useInput.js';
import './SignupForm.scss';

function SignupForm() {
  const dispatch = useDispatch();

  const [email, emailInput] = useInput({ type: 'text', placeholder: '이메일', required: true })
  const [password, passwordInput] = useInput({ type: 'password', placeholder: '패스워드(영문, 숫자 포함 6~12자)', required: true })
  const [passwordConfirm, passwordConfirmInput] = useInput({ type: 'password', placeholder: '패스워드 확인', required: true })
  const [nickName, nickNameInput] = useInput({ type: 'text', placeholder: '닉네임(특수문자 제외 2자 이상)', required: true })

  const isEmailOk = email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
  const isPasswordOk = password.match(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,12}$/);
  const isPasswordConfirmOk = password !== '' && password === passwordConfirm;
  const isNickNameOk = nickName.match(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!(isEmailOk && isPasswordOk && isPasswordConfirmOk && isNickNameOk)) {
      alert('입력한 정보를 다시 확인하세요.');
      return;
    }

    dispatch(userActionCreators.fetchSignUp({ email, password, nickName }));
  }

  return (
    <div className="signup-form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-inputs">
          <div className="input-wrapper">
            {emailInput}
            {<span className={`valid-check ${isEmailOk ? 'clicked' : ''}`}>✔</span>}
          </div>
          <div className="input-wrapper">
            {passwordInput}
            <span className={`valid-check ${isPasswordOk ? 'clicked' : ''}`}>✔</span>
          </div>
          <div className="input-wrapper">
            {passwordConfirmInput}
            <span className={`valid-check ${isPasswordConfirmOk ? 'clicked' : ''}`}>✔</span>
          </div>
          <div className="input-wrapper">
            {nickNameInput}
            <span className={`valid-check ${isNickNameOk ? 'clicked' : ''}`}>✔</span>
          </div>
        </div>
        <div className="signup-form-buttons">
          <button className="green">회원가입</button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
