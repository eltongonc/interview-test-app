import React, { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2'; // experimental

import { Container, debounce } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { Post } from './Post';
import { PostType } from '../types/postTypes';
import { getPosts } from '../utils/api';
import { Stack } from '@mui/system';

type Props = {
	data?: PostType[];
};

/* The max post of the api is 100 */
const maxPosts = 100;

const PostList = ({ data = [] }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState<PostType[]>(data);

	const displayPosts = () => {
		return posts.map((post, i) => {
			return (
				<Grid2 xs={12} md={6} key={i}>
					<Post title={post.title} data={post}>
						{post.body}
					</Post>
				</Grid2>
			);
		});
	};

	const displayButton = () => {
		if (posts.length !== maxPosts && isLoading) {
			return <CircularProgress className="loader" size={24} />;
		}

		if (posts.length !== maxPosts && !isLoading) {
			return (
				<Button
					onClick={loadMorePosts}
					variant="outlined"
					color="info"
					className="more-button"
				>
					Load more
				</Button>
			);
		}
	};

	const loadMorePosts = async () => {
		setIsLoading(true);

		const data = await getPosts(10);
		setPosts((oldPosts) => oldPosts.concat(data));
		setIsLoading(false);
	};

	useEffect(() => {
		// // Load new post on scroll
		// document.addEventListener(
		// 	'scroll',
		// 	debounce(() => {
		// 		let pageHeight = document.body.scrollHeight;
		// 		let scroll = window.innerHeight + window.scrollY;
		// 		if (scroll >= pageHeight && posts.length !== maxPosts) {
		// 			if (!isLoading) {
		// 				loadMorePosts();
		// 				setIsLoading(true);
		// 			}
		// 		}
		// 	}, 300)
		// );
	}, []);

	useEffect(() => {
		setPosts(data);
	}, [data]);

	if (posts.length > 0) {
		return (
			<Container className="post-list">
				<Grid2 container spacing={2}>
					{displayPosts()}
				</Grid2>

				<Stack alignItems="center" justifyContent="center">
					{displayButton()}
				</Stack>
			</Container>
		);
	}

	return (
		<div className="post-list">
			<CircularProgress className="loader" color="secondary" />
		</div>
	);
};

export default PostList;
