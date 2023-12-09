import { useEffect, useState } from 'react';
import useAccessToken from './useAccessToken';

export default function useWalletFunctions() {
	const [data, setData] = useState<string>('');
	const { accessToken, getNewAccessToken } = useAccessToken();
	const speak = (text: string) => {
		const value = new SpeechSynthesisUtterance(text);
		window.speechSynthesis.speak(value);
	};
	const walletOperations = (textInput: string) => {
		const token = accessToken && JSON.parse(accessToken).token;
		console.log(textInput, accessToken);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				queryInput: { text: { text: textInput, languageCode: 'en' } },
				queryParams: {
					source: 'DIALOGFLOW_CONSOLE',
					timeZone: 'Asia/Calcutta',
					sentimentAnalysisRequestConfig: {
						analyzeQueryTextSentiment: true,
					},
				},
			}),
		};

		return fetch(
			'https://dialogflow.googleapis.com/v2beta1/projects/assistant-rmmeqm/locations/global/agent/sessions/6fd71115-e8b7-93e7-fcea-6f4cf1756b9a:detectIntent',
			options,
		)
			.then((response) => response.json())
			.then(async (response) => {
				console.log(response);
				setData(response.queryResult.fulfillmentText);
				speak(response.queryResult.fulfillmentText);
			})
			.catch((err) => console.error(err));
	};

	return { walletOperations, data, setData, speak };
}
