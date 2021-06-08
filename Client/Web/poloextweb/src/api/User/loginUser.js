import { SERVER_URL } from '../../constants/serverURL.js';
import validateResponse from '../validateResponse.js';

export const loginUser = (email, password) => {

	return fetch(SERVER_URL + '/auth/authenticate',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': email,
				'password': password,
			})
		})
		.then(response => {

			return response.json().then(json => {

				return validateResponse(response) ? json : Promise.reject(json);
			});
		});
};
