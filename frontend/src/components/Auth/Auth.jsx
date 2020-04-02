import React from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import "./Auth.scss";

function Auth() {
  return (
    <div className="auth">
      <div className="global-container">
        <div className="auth-container">
          <SigninForm />
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default Auth
