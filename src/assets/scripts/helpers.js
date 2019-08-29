import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * API object
 * Client id will be removed after a week
 */
export const API = {
	imagesUrl(count) { return `https://api.unsplash.com/photos/random?count=${count}&client_id=a670cd3f5fc5db92e41bcb7a248ff4cfa140256d4a70f752403bad58bc17362d`; },
	postsUrl: `${BASE_URL}/posts/`,
	commentsUrl: `${BASE_URL}/comments/`,
	userUrl: `${BASE_URL}/user/`,
	startAt: 0,
};


/**
 * This function will call the api and get n amount of posts
 * @param {function} callback a function that will return the data or an error
 */
export function getPosts(amount, callback) {
	axios({
		method: 'GET',
		url: `${API.postsUrl}?_start=${API.startAt}&_limit=${amount}`
	}).then((res) => {
		getImages(amount, (err, data) => {
			if(err) {
				console.log(err);
			} else {
				res.data = res.data.reduce((result, post, i) => {
					const postImg = data[i];
					post.image = postImg;

					result.push(post);
					return result;
				}, []);

				if (callback) {
					callback(null, res.data);
				}

				API.startAt += amount;
			}
		});
	}).catch((err) => {
		if (callback) {
			callback(err, null);
		}
	});
}


/**
 * This function will call the api and get n amount of posts
 * @param {function} callback a function that will return the data or an error
 */
export function getImages(amount, callback) {

	axios({
		method: 'GET',
		url: API.imagesUrl(amount),
	}).then((res) => {
		if (callback) {
			callback(null, res.data);
		}
		
	}).catch((err) => {
		if (callback) {
			callback(err, null);
		}
	});

}


/**
 * This function gets all the comments from a post
 * @param {number} id The id of the post
 * @param {function} callback A function that will return the data or an error
 */
export function getComments(id, callback) {
	axios({
		method: 'GET',
		url: `${API.commentsUrl}?postId=${id}`
	}).then((res) => {
		if (callback) {
			callback(null, res.data);
		}
	}).catch((err) => {
		if (callback) {
			callback(err, null);
		}
	});
}


/**
 * Styles used by the Material UI library
 * @param {*} theme 
 */
export function styles(theme) {
	return {
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[1],
		},
		root: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
		progress: {
			margin: theme.spacing(2),
		},
	};
}