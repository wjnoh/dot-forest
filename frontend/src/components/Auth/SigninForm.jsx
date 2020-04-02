import React from 'react';
import './SigninForm.scss';

function SigninForm() {
  return (
    <div className="signin-form-wrapper">
      <form className="signin-form">
        <div className="signin-form-inputs">
          <input type="text" placeholder="이메일" required />
          <input type="text" placeholder="패스워드" required />
        </div>
        <div className="signin-form-buttons">
          <button className="green">로그인</button>
          <button className="">회원가입 인증 메일 재전송</button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
