'use client';
import React, { useState, useEffect } from 'react';

const SiriComponent: React.FC = () => {
	const [listening, setListening] = useState(false);
	const [text, setText] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [data, setData] = useState<string>('');
	const [action, setAction] = useState<string>('');
	let speech: SpeechSynthesisUtterance;

	const speak = async (text: string) => {
		window.speechSynthesis.speak(speech);
	};

	const walletOperations = (textInput: string) => {
		console.log(textInput);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization:
					'Bearer ya29.a0AfB_byCbnnqobSMgSzeySeArsJTZc_D2ccQL-PComxv-nltZEOPYrCCkMyHynR7e8_eanKg0VdjKzJ7ugiO24VOo805vNrvDz6P8bnZ9KDa1W92WpPXkNnz2lVotZVqgv7y0dJ_DrIlgGC0TlucbtN_jNPDPr8GJoUfuxMJRtvsvmLP-apIZRafD1EBpTvZMmbWJdllgJisgpqcK-F79_IY7VfJncqV8zZjkNjXIfDY1_NOsNzCBO9UysfcO2gJYUMy1EbJA7KPagFxCWfoCvmDe37Y829VtsrIdQd9zcvdJLHnRS0Vb-M4N0jJ09SGYiDvUY-7E1YvziE_zcF4ivbTWhnHvkruXjZ0mf9Rxb1fVlbk_f3RfLP70aGqC8MA6pPe6thPTjoFqE-3GXUlOXUZVb8Tacy2vfYIVM-aVaCgYKASUSARMSFQHGX2Mi8T2uEveAu8SNp8IrN4_p4A0431',
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
			})
			.catch((err) => console.error(err));
	};

	const fetchInfo = () => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization:
					'Bearer ya29.a0AfB_byCbnnqobSMgSzeySeArsJTZc_D2ccQL-PComxv-nltZEOPYrCCkMyHynR7e8_eanKg0VdjKzJ7ugiO24VOo805vNrvDz6P8bnZ9KDa1W92WpPXkNnz2lVotZVqgv7y0dJ_DrIlgGC0TlucbtN_jNPDPr8GJoUfuxMJRtvsvmLP-apIZRafD1EBpTvZMmbWJdllgJisgpqcK-F79_IY7VfJncqV8zZjkNjXIfDY1_NOsNzCBO9UysfcO2gJYUMy1EbJA7KPagFxCWfoCvmDe37Y829VtsrIdQd9zcvdJLHnRS0Vb-M4N0jJ09SGYiDvUY-7E1YvziE_zcF4ivbTWhnHvkruXjZ0mf9Rxb1fVlbk_f3RfLP70aGqC8MA6pPe6thPTjoFqE-3GXUlOXUZVb8Tacy2vfYIVM-aVaCgYKASUSARMSFQHGX2Mi8T2uEveAu8SNp8IrN4_p4A0431',
			},
			body: '{"queryInput":{"text":{"text":"hi","languageCode":"en"}},"queryParams":{"source":"DIALOGFLOW_CONSOLE","timeZone":"Asia/Calcutta","sentimentAnalysisRequestConfig":{"analyzeQueryTextSentiment":true}}}',
		};

		return fetch(
			'https://dialogflow.googleapis.com/v2beta1/projects/assistant-rmmeqm/locations/global/agent/sessions/6fd71115-e8b7-93e7-fcea-6f4cf1756b9a:detectIntent',
			options,
		)
			.then((response) => response.json())
			.then(async (response) => {
				console.log(response);
				setData(response.queryResult.fulfillmentText);
			})
			.catch((err) => console.error(err));
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
				if (transcript.toLowerCase().includes('hey iris')) {
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
		speech = new SpeechSynthesisUtterance(text);
		fetchInfo();
	}, []);

	const handleStartListening = () => {
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
			<p style={{ color: 'black' }}>{text}</p>
			<button onClick={handleStopListening}>Stop Listening</button>
			{showModal && (
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
									fontSize: '15px',
									fontWeight: 500,
									fontFamily: 'inter',
								}}
							>
								{data ? data : 'loading...'}
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
								<input
									type='text'
									style={{ color: 'black' }}
									value={action}
									onChange={(e) => setAction(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter')
											walletOperations(action);
									}}
								/>
							</div>
						</div>
						<br />
					</div>
					{/* <button onClick={handleSendApiCall}>Send</button>
					<button onClick={() => setShowModal(false)}>Close</button> */}
				</div>
			)}
		</div>
	);
};

export default SiriComponent;
