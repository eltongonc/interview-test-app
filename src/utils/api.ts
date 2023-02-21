import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * API object
 * Client id will be removed after a week
 */
export const API = {
	imagesUrl(count: number) {
		return `https://api.unsplash.com/photos/random?count=${count}&client_id=a670cd3f5fc5db92e41bcb7a248ff4cfa140256d4a70f752403bad58bc17362d`;
	},
	postsUrl: `${BASE_URL}/posts/`,
	commentsUrl: `${BASE_URL}/comments/`,
	userUrl: `${BASE_URL}/user/`,
	startAt: 0,
};

/**
 * This function will call the api and get n amount of posts
 * @param {function} callback a function that will return the data or an error
 */
export async function getPosts(amount: number) {
	try {
		const res = await axios({
			method: 'GET',
			url: `${API.postsUrl}?_start=${API.startAt}&_limit=${amount}`,
		});

		const posts = res.data;

		const imgRes = await getImages(amount);

		const result = posts.map((post: any, i: number) => {
			post.image = imgRes.data[i];
			return post;
		});

		// Set next page
		// TODO: move it to the url
		API.startAt += amount;

		return result;
	} catch (error) {
		return error;
	}
}

/**
 * This function will call the api and get n amount of posts
 * @param {function} callback a function that will return the data or an error
 */
export async function getImages(amount: number) {
	return await axios({
		method: 'GET',
		url: API.imagesUrl(amount),
	});
}

/**
 * This function gets all the comments from a post
 * @param {number} id The id of the post
 * @param {function} callback A function that will return the data or an error
 */
export function getComments(id: string, callback: (x: any, y: any) => void) {
	axios({
		method: 'GET',
		url: `${API.commentsUrl}?postId=${id}`,
	})
		.then((res) => {
			if (callback) {
				callback(null, res.data);
			}
		})
		.catch((err) => {
			if (callback) {
				callback(err, null);
			}
		});
}
