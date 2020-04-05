import React, { lazy, Suspense  } from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';

function RouterComponent() {
  const isSignIn = useSelector(state => state.user.isSignIn, isEqual);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    if (Component) {
      return (
        <Route
          {...rest}
          render={props =>
            // 유저가 있을 경우(로그인된 경우)에만 이동한다. 아니면 auth 페이지로 리다이렉트.
            isSignIn ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/auth",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    } else {
      return null;
    }
  };

  const PublicRoute = ({ component: Component, ...rest }) => {
    if (Component) {
      return (
        <Route
          {...rest}
          render={props =>
            // 로그인이 돼있는 상태에서 로그인 관련 페이지로 이동하면 리다이렉트한다.
            isSignIn && rest.path === "/auth" ? (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            ) : (
              <Component {...props} />
            )
          }
        />
      );
    } else {
      return null;
    }
  };

  const Auth = lazy(() => import("./components/Auth/Auth"));
  const NewPost = lazy(() => import("./components/NewPost/NewPost"));
  const MyPage = lazy(() => import("./components/MyPage/MyPage"));
  const PostList = lazy(() => import("./components/PostList/PostList"));

  return (
    <Suspense fallback={<div>로딩 중입니다.</div>}>
      <Header />
      <Navigation />
      <Switch>
        <PublicRoute exact path="/auth" component={Auth} />
        <PrivateRoute exact path="/new" component={NewPost} />
        <PrivateRoute exact path="/my" component={MyPage} />
        <PublicRoute exact path="/" component={PostList} />
        <PublicRoute path="*" component={PostList} />
      </Switch>
    </Suspense >
  )
}

export default withRouter(RouterComponent)
