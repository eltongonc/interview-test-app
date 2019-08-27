import React from 'react';
import { connect } from 'react-redux';

import store from '../assets/scripts/store';

import Post from './Post';
 
class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			index: 0,
		};	

		this.displayPosts = this.displayPosts.bind(this);
	}

	displayPosts() {
		return this.state.posts.map((post, i) => <Post key={i} title={post.title} data={post}>{post.body}</Post>);
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState({
				posts: store.getState().posts.posts,
			});
		});
	}

	render() {
		if (this.state.posts) {
			return (
				<div className="post-list">
					{this.displayPosts()}
				</div>
			);
		}

		return (
			<div className="post-list">
				<h1>Loading posts...</h1>
			</div>
		);
	}
}

const mapPropsToState = (state) => {
	return {
		...state
	};
};

export default connect(mapPropsToState)(PostList);
