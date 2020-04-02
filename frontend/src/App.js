import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import PostList from './components/PostList/PostList';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Router >
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
      </Router >
    </div>
  );
}

export default App;
