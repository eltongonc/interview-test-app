import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import { getPosts, getImages } from '../assets/scripts/helpers';
 
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

class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
		};

		this.loadPosts = this.loadPosts.bind(this);
		this.displayPosts = this.displayPosts.bind(this);
	}

	loadPosts() {
		// generate 20 posts
		for (let i = 0; i < 20; i++) {
			posts.push({title:'accusamus beatae ad facilis cum similique qui sunt', body: 'quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto'});
		}

		this.setState({
			posts
		});
	}

	displayPosts() {
		return this.state.posts.map((post, i) => <Post key={i} title={post.title}>{post.body}</Post>);
	}

	render() {
		console.log(this.state.posts);
		
		return (
			<div className="post-list">
				{this.displayPosts()}

				<button onClick={this.loadPosts}>Load more</button>
			</div>
		);
	}

	componentDidMount() {
		this.loadPosts();
	}
}

PostList.propTypes = {};

export default PostList;
