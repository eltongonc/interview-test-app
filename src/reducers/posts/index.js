
const initState = {};

export default (state = initState, action) => {
	switch (action.type) {
	case 'SET_POSTS':
		return {
			...state,
			posts: action.posts
		};
	case 'SET_IMAGES':
		return {
			...state,
			images: action.images
		};
	default:
		return state;
	}
};