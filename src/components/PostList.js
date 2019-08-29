import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import store from '../reducers/store';

import Post from './Post';
import { getPosts } from '../assets/scripts/helpers';
import { setPosts } from '../reducers/posts/actions';

/* The max post of the api is 100 */
const maxPosts = 100;

class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			isLoading: false,
		};	

		this.displayPosts = this.displayPosts.bind(this);
		this.displayButton = this.displayButton.bind(this);
		this.loadMorePosts = this.loadMorePosts.bind(this);
	}

	displayPosts() {
		return this.props.posts.map((post, i) => {
			return <Post key={i} title={post.title} data={post}>{post.body}</Post>;
		});
	}

	displayButton() {
		if(this.props.posts.length !== maxPosts && this.state.isLoading) {
			return <CircularProgress className="loader" size={24} />;
		} else if(this.props.posts.length !== maxPosts && !this.state.isLoading) {
			return (
				<Button 
					onClick={this.loadMorePosts} 
					variant="contained" 
					color="secondary"
					className="more-button"
				>
					Load more
				</Button>
			);
		} 

		return;
	}

	loadMorePosts() {
		getPosts(20, (err, data) => {
			if(err) {
				console.log(err);
			} else if(this.state.posts.length !== maxPosts) {
				store.dispatch( setPosts(data) );
				this.setState({
					isLoading: false,
				});
			}
		});
	}

	componentDidMount() {
		// Load new post on scroll
		document.addEventListener('scroll', () => {
			let pageHeight = document.body.scrollHeight;
			let scroll = window.innerHeight + window.scrollY;

			if ((scroll >= pageHeight) && this.state.posts.length !== maxPosts) {
				if (!this.state.isLoading) {
					this.loadMorePosts();
					this.setState({
						isLoading: true
					});
				}
			}
		});
	}

	render() {
		if (this.props.posts.length > 0) {
			return (
				<Container className="post-list">
					{this.displayPosts()}

					{this.displayButton()}
				</Container>
			);
		}

		return (
			<div className="post-list">
				<CircularProgress className="loader" color="secondary" />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {...state};
};

PostList.propTypes = {
	posts: PropTypes.array,
};

export default connect(mapStateToProps)(PostList);
