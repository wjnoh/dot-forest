import React from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import PostList from './components/PostList/PostList';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <PostList />
    </div>
  );
}

export default App;
