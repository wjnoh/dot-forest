import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import PostList from './components/PostList/PostList';
import Auth from './components/Auth/Auth';

function RouterComponent() {
  return (
    <>
      <Header />
      <Navigation />
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <PostList />
        </Route>
      </Switch>
    </>
  )
}

export default withRouter(RouterComponent)
