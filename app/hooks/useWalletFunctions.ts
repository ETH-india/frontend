import { useEffect, useState } from 'react';
import useAccessToken from './useAccessToken';
import { atom, useAtom } from 'jotai';
import { dataAtom, isConnectedAtom } from '../store/modalStore';

export default function useWalletFunctions() {
	const [data, setData] = useAtom(dataAtom);
	const [connected, setConnected] = useAtom(isConnectedAtom);
	const { accessToken, getNewAccessToken } = useAccessToken();
	const speak = (text: string) => {
		const value = new SpeechSynthesisUtterance(text);
		window.speechSynthesis.speak(value);
	};

	const connect = async () => {
		if (connected) return;
		await initializeWallet();
		await walletOperations('connect manu');
	};
	const initializeWallet = async () => {
		await getNewAccessToken();
		const token = accessToken && JSON.parse(accessToken).token;
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization: `Bearer ${token}`,
			},
			body: '{"queryInput":{"text":{"text":"hi","languageCode":"en"}},"queryParams":{"source":"DIALOGFLOW_CONSOLE","timeZone":"Asia/Calcutta","sentimentAnalysisRequestConfig":{"analyzeQueryTextSentiment":true}}}',
		};

		try {
			const response = await fetch(
				'https://dialogflow.googleapis.com/v2beta1/projects/assistant-rmmeqm/locations/global/agent/sessions/6fd71115-e8b7-93e7-fcea-6f4cf1756b9a:detectIntent',
				options,
			);
			const response_1 = await response.json();
			console.log(response_1);
			setConnected(true);
			//setData(response_1.queryResult.fulfillmentText);
		} catch (err) {
			return console.error(err);
		}
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

	return { walletOperations, data, setData, speak, connect, connected };
}
