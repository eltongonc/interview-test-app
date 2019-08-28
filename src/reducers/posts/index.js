
const initState = [];

export default (state = initState, action) => {
	switch (action.type) {
	case 'SET_POSTS':
		return [...state, ...action.posts ];
	default:
		return state;
	}
};