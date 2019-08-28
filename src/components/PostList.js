import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import store from '../assets/scripts/store';

import Post from './Post';
import { getPosts } from '../assets/scripts/helpers';
import { setPosts } from '../reducers/posts/actions';
import { Container } from '@material-ui/core';
 
class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			index: 0,
		};	

		this.displayPosts = this.displayPosts.bind(this);
		this.loadMorePosts = this.loadMorePosts.bind(this);
	}

	displayPosts() {
		return this.state.posts.map((post, i) => {
			return <Post key={i} title={post.title} data={post}>{post.body}</Post>
		});
	}

	loadMorePosts() {
		getPosts(20, (err, data) => {
			if(err) {
				console.log(err);
			} else {
				// console.log(this.moreBtn);
				
				this.moreBtn.blur();
				store.dispatch(
					setPosts(data)
				);
			}
		});
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState({
				posts: store.getState().posts,
			});
		});


		// detect scroll
		document.addEventListener('scroll', () => {
			let pageHeight = document.body.offsetHeight;
			let scroll = window.innerHeight + window.scrollY;

			if (scroll >= pageHeight && this.state.posts.length !== 100) {
				this.loadMorePosts();
			}
		});
	}

	render() {
		if (this.state.posts.length > 0) {
			return (
				<Container className="post-list">
					{this.displayPosts()}

					{
						this.state.posts.length !== 100 ?
							<Button ref={(r)=> this.moreBtn = r} onClick={this.loadMorePosts} variant="contained" color="secondary">
								Load more
							</Button> :
							null
					}
				</Container>
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
