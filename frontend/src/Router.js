import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import PostList from './components/PostList/PostList';
import Auth from './components/Auth/Auth';

function Router() {
  return (
    <BrowserRouter >
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
    </BrowserRouter >
  )
}

export default Router
