import React from 'react';
import PropTypes from 'prop-types';
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
		return this.state.posts.map((post, i) => <Post key={i} title={post.title}>{post.body}</Post>);
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState({
				posts: store.getState().posts.posts,
			})
		});
	}

	render() {
		return (
			<div className="post-list">
				{this.displayPosts()}
			</div>
		);
	}
}

PostList.propTypes = {};

const mapPropsToState = (state)=> {
	return {
		...state
	}
};

export default connect(mapPropsToState)(PostList);
