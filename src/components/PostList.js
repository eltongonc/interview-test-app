import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import { getPosts } from '../assets/scripts/helpers';
 
class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.generatePosts = this.generatePosts.bind(this);
	}

	generatePosts() {
		getPosts((err, data) => {
			if(err) {
				console.log(err);
			} else {
				console.log(data);
			}
		});
		
		const posts = [];


		// generate 20 posts
		for (let i = 0; i < 20; i++) {
			posts.push(<Post key={i}/>);
		}

		return posts;
	}

	render() {
		return (
			<div>
				{this.generatePosts()}
			</div>
		);
	}
}

PostList.propTypes = {};

export default PostList;
