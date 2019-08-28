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
		return this.props.posts.map((post, i) => {
			return <Post key={i} title={post.title} data={post}>{post.body}</Post>;
		});
	}

	loadMorePosts() {
		getPosts(20, (err, data) => {
			if(err) {
				console.log(err);
			} else if(this.state.posts.length !== 100) {
				this.moreBtn.blur();
				store.dispatch(
					setPosts(data)
				);
			}
		});
	}

	componentDidMount() {
		console.log(this);
		
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
		if (this.props.posts.length > 0) {
			return (
				<Container className="post-list">
					{this.displayPosts()}

					{/* The max post of the api is 100 */
						this.props.posts.length !== 100 ?
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

const mapStateToProps = (state) => {
	return {...state};
};

export default connect(mapStateToProps)(PostList);
