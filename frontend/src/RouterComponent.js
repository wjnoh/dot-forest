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

  const Auth = lazy(() => import("./pages/Auth/Auth"));
  const NewPost = lazy(() => import("./pages/NewPost/NewPost"));
  const MyPage = lazy(() => import("./pages/MyPage/MyPage"));
  const Main = lazy(() => import("./pages/Main/Main"));
  const Category = lazy(() => import("./pages/Category/Category"));

  return (
    <Suspense fallback={<div>로딩 중입니다.</div>}>
      <Header />
      <Navigation />
      <Switch>
        <PublicRoute exact path="/auth" component={Auth} />
        <PrivateRoute exact path="/new" component={NewPost} />
        <PrivateRoute exact path="/my" component={MyPage} />
        <PublicRoute exact path="/category/:categoryId" component={Category} />
        <PublicRoute exact path="/" component={Main} />
        <PublicRoute path="*" />
      </Switch>
    </Suspense >
  )
}

export default withRouter(RouterComponent)
