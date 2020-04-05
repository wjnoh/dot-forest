import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import * as userActionCreators from '../../store/actionCreators/user';
import history from '../../utils/history';
import "./Header.scss";

function Header() {
  const dispatch = useDispatch();
  const { isSignIn } = useSelector(state => state.user, isEqual);

  useEffect(() => {
    if(isSignIn) {
      dispatch(userActionCreators.fetchCurrentUser());
    }
  }, [])

  const handleSignOut = () => {
    if(isSignIn) {
      dispatch(userActionCreators.signOut());
    }
  }
  
  return (
    <header className="header">
      <div className="global-container">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>도트의 숲</h1>
          </Link>
          <ul className="header-items">
            {
              isSignIn ? (
                <>
                  <li className="header-item">
                    <Link to="/new" className="header-button">새 도트</Link>
                  </li>
                  <li className="header-item">
                    {
                      history.location.pathname === '/my' ? (
                        <span className="header-button" onClick={handleSignOut}>로그아웃</span>
                      ) : (
                        <Link to="/my" className="header-button">MY</Link>
                      )
                    }
                  </li>
                </>
              ) : (
                <li className="header-item">
                  <Link to="/auth" className="header-button">로그인</Link>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
