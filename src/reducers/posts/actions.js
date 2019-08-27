// Get a list of all posts
export function setPosts(posts) {
	return {
		type: 'SET_POSTS',
		posts,
	};
}