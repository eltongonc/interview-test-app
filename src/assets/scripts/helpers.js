import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * API object
 */
export const API = {
	photos_url: `${BASE_URL}/photos/`,
	posts_url: `${BASE_URL}/posts/`,
	comments_url: `${BASE_URL}/comments/`,
	user_url: `${BASE_URL}/user/`,
};


/**
 * This function will call the api and get n amount of posts
 * @param {function} callback a function that will return the data or an error
 */
export function getPosts(callback) {
	axios({
		method: 'GET',
		url: API.posts_url + '?_limit=10',
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
 * This function will call the api and get n amount of posts
 * @param {function} callback a function that will return the data or an error
 */
export function getImages(amount, callback) {
	axios({
		method: 'GET',
		url: `${API.photos_url}?_limit=${10}`
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