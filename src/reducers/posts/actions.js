import { SET_POSTS, GET_POSTS } from '../actionTypes';

// Get a list of all posts
export function getPosts() {
	return {
		type: GET_POSTS,
		posts,
	};
}

export function updatePosts(data) {
	return (dispatch) => {
		dispatch(setPosts(data));
	};
}

// Update the gotten post
export function setPosts(posts) {
	return {
		type: SET_POSTS,
		posts,
	};
}