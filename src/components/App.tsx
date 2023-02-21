import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import Header from './Header';
import PostList from './PostList';
import ScrollTop from './ScrollTop';
import { getPosts } from '../utils/api';

const App = (props: any) => {
	const [posts, setPosts] = useState(undefined);

	useEffect(() => {
		/**
		 * Load 10 post at first
		 */
		const initPosts = async () => {
			const data = await getPosts(10);
			setPosts(data);
		};

		if (!posts) {
			initPosts();
		}
	}, []);

	return (
		<div className="app">
			<Header />
			<Toolbar id="back-to-top-anchor" />
			<PostList data={posts} />
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</div>
	);
};

export default App;
