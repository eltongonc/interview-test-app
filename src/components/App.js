import React from 'react';
import store from '../assets/scripts/store';

import Header from './Header';
import PostList from './PostList';
import { getPosts, getImages } from '../assets/scripts/helpers';
import { setPosts, saveImages } from '../reducers/posts/actions';

class App extends React.Component {
  componentDidMount() {
    
    getPosts((err, data) => {
      if(err) {
        console.log(err);
      } else {
        store.dispatch(
          setPosts(data)
        );
      }
    });
    getImages(100, (err, data) => {
      if(err) {
        console.log(err);
      } else {
        store.dispatch(
          saveImages(data)
        );
      }
    });
  }
  render() {
    return (
      <div className="App">
        <Header/>
        <PostList/>
      </div>
    );
  }
}


export default App;
