import React from 'react';
import SigninForm from '../../components/SignForm/SigninForm';
import SignupForm from '../../components/SignForm/SignupForm';
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
