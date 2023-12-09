import { useEffect, useState } from 'react';

export default function useAccessToken() {
	const accessToken = localStorage.getItem('accessToken');

	useEffect(() => {
		const accessTokenParsed = accessToken ? JSON.parse(accessToken) : null;
		if (
			accessTokenParsed &&
			accessTokenParsed.expires_in < Date.now() / 1000
		) {
			console.log(
				'get new access token',
				accessTokenParsed.expires_in,
				Date.now() / 1000,
			);
			getNewAccessToken();
		}
	}, []);

	const getNewAccessToken = async () => {
		const response = await fetch('http://localhost:8080/authToken', {
			method: 'POST',
		});

		const fetchedAccessToken = await response.json();
		console.log(fetchedAccessToken);
		localStorage.setItem('accessToken', JSON.stringify(fetchedAccessToken));
	};

	return { accessToken, getNewAccessToken };
}
