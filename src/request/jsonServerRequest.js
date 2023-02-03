import axios from 'axios';

const JSON_SERVER_ENDPOINT = 'http://localhost:4000';

const request = axios.create({
	baseURL: JSON_SERVER_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const getRequest = (url, params = null, options = null) =>
	request.get(url, { params, ...options });
