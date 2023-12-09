'use client';
import React, { useState, useEffect } from 'react';
import useAccessToken from '../hooks/useAccessToken';
import { get } from 'http';
import { useAtom } from 'jotai';
import { modalAtom } from '../store/modalStore';
import SVGComponent from '../microphone';

const SiriComponent: React.FC = () => {
	const [listening, setListening] = useState(false);
	const [text, setText] = useState('');
	const [showModal, setShowModal] = useAtom(modalAtom);
	const [data, setData] = useState<string>('');
	const [action, setAction] = useState<string>('');
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

	const fetchInfo = async () => {
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
			setData(response_1.queryResult.fulfillmentText);
		} catch (err) {
			return console.error(err);
		}
	};

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.onresult = (event) => {
			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript.trim();
				setText(transcript);
				if (transcript.toLowerCase().includes('iris')) {
					setShowModal(true);
					setListening(false);
					recognition.stop();
				}
			}
		};

		if (listening) {
			recognition.start();
		} else {
			recognition.stop();
		}

		return () => recognition.abort();
	}, [listening]);

	useEffect(() => {
		fetchInfo();
	}, []);

	const handleStartListening = () => {
		console.log('Getting new access token');
		getNewAccessToken();
		setListening(true);
	};

	const handleStopListening = () => {
		setListening(false);
	};

	const handleSendApiCall = () => {
		// Replace with your API call function
		console.log('Sending:', text);
	};

	return (
		<div style={{ backgroundColor: 'white', height: '100vh' }}>
			<button onClick={handleStartListening}>Start Listening</button>

			<button onClick={handleStopListening}>Stop Listening</button>
			{showModal && (
				<>
					<div className='modal'>
						<div className='voice-elt'>
							<div className='spinner-border'>
								<div className='spinner'>
									<div className='spinner-inside'></div>
								</div>
							</div>

							<div
								style={{
									width: 'max-content',
									padding: '1.2rem',
									border: '1px solid #e0e0e0',
									boxShadow: '0px 0px 10px 0px #e0e0e0',
									background: 'white',
									borderRadius: '12px 12px 12px 12px',
									justifyContent: 'center',
									alignItems: 'center',
									position: 'absolute',
									right: '0rem',
									top: '7rem',
								}}
							>
								<div
									style={{
										color: 'black',
										fontSize: '13px',
										fontWeight: 500,
									}}
								>
									{data ? data : 'loading...'}
								</div>
							</div>
							<br />
						</div>
						{/* <button onClick={handleSendApiCall}>Send</button>
					<button onClick={() => setShowModal(false)}>Close</button> */}
					</div>

					<div className='floatingButton'>
						{/* <input
									type='text'
									style={{ color: 'black' }}
									value={action}
									onChange={(e) => setAction(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter')
											walletOperations(action);
									}}
								/> */}

						<button
							style={{
								borderRadius: '50%',
								padding: '1rem',
							}}
							onMouseDown={handleStartListening}
							onMouseUp={() => {
								handleStopListening();
								walletOperations(text);
							}}
							onTouchStart={handleStartListening} // For touch devices
							onTouchEnd={() => {
								handleStopListening();
								walletOperations(text);
							}}
						>
							<SVGComponent></SVGComponent>
						</button>
					</div>
					<div className='floatingText'>
						{/* <input
									type='text'
									style={{ color: 'black' }}
									value={action}
									onChange={(e) => setAction(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter')
											walletOperations(action);
									}}
								/> */}
						{listening ? (
							<div className='animation-wrapper'>
								<div className='circle'></div>
								<div className='circle'></div>
								<div className='circle'></div>
								<div className='circle'></div>
								<div className='circle'></div>
								<div className='circle'></div>
								<div className='circle'></div>
								<div className='circle'></div>
							</div>
						) : (
							<h3
								style={{
									color: 'black',
									position: 'fixed',
									width: '400px',
									padding: '1rem',
									border: '1px solid #e0e0e0',
									borderRadius: '12px 12px 12px 12px',
									maxHeight: '50px',
									overflow: 'scroll',
									maxWidth: '300px',
								}}
							>
								{text}
							</h3>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default SiriComponent;
