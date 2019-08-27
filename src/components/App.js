import React from 'react';
import store from '../assets/scripts/store';

import Header from './Header';
import PostList from './PostList';
import { getPosts } from '../assets/scripts/helpers';
import { setPosts } from '../reducers/posts/actions';

class App extends React.Component {
	componentDidMount() {
    
		getPosts(20, (err, data) => {
			if(err) {
				console.log(err);
			} else {
				store.dispatch(
					setPosts(data)
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
