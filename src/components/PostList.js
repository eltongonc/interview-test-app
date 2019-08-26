import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import { getPosts, getImages } from '../assets/scripts/helpers';
 
class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.generatePosts = this.generatePosts.bind(this);
	}

	generatePosts() {
		const posts = [];
		
		getPosts((err, data) => {
			if(err) {
				console.log(err);
			} else {
				console.log(data);
			}
		});
		getImages(100, (err, data) => {
			if(err) {
				console.log(err);
			} else {
				console.log(data);
			}
		});
		
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
