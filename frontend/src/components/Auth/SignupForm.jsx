import React from 'react';
import './SignupForm.scss';

function SignupForm() {
  return (
    <div className="signup-form-wrapper">
      <form className="signup-form">
        <div className="signup-form-inputs">
          <input type="text" placeholder="이메일" required />
          <input type="text" placeholder="패스워드" required />
          <input type="text" placeholder="패스워드 확인" required />
          <input type="text" placeholder="닉네임" required />
        </div>
        <div className="signup-form-buttons">
          <button className="green">회원가입</button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
