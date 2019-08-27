import React from 'react';
import { connect } from 'react-redux';

import store from '../assets/scripts/store';

import Post from './Post';
 
class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			images: [],
			index: 0,
		};	

		this.displayPosts = this.displayPosts.bind(this);
	}

	displayPosts() {
		const posts = this.state.posts.reduce((result, post, i) => {
			const postImg = this.state.images[i];
			
			post.image = postImg;

			result.push(
				<Post key={i} title={post.title} data={post}>{post.body}</Post>
			);

			return result;
		}, []);

		return posts;
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState({
				posts: store.getState().posts.posts,
				images: store.getState().posts.images,
			});
		});
	}

	render() {
		if (this.state.posts && this.state.images) {
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
