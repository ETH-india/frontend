'use client';
import React, { useState, useEffect } from 'react';

function App() {
	const [isRecording, setisRecording] = useState(false);
	const [note, setNote] = useState('');
	const [ourText, setOurText] = useState('');
	const [triggerIris, setTriggerIris] = useState(false);
	const [notesStore, setnotesStore] = useState<string[]>(['']);
	let microphone: any = undefined;
	let msg: any = undefined;

	if (typeof window !== 'undefined') {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		msg = new SpeechSynthesisUtterance();
		microphone = new SpeechRecognition();
		microphone.continuous = true;
		microphone.interimResults = true;
		microphone.lang = 'en-US';
	}

	const speechHandler = (msg: any) => {
		msg.text = ourText;
		if (typeof window !== 'undefined') {
			window.speechSynthesis.speak(msg);
		}
	};

	useEffect(() => {
		startRecordController();
	}, [isRecording]);

	const startRecordController = () => {
		if (isRecording) {
			microphone.start();
			microphone.onend = () => {
				console.log('continue..');
				microphone.start();
			};
		} else {
			microphone.stop();
			microphone.onend = () => {
				console.log('Stopped microphone on Click');
			};
		}
		microphone.onstart = () => {
			console.log('microphones on');
		};

		microphone.onresult = (event: any) => {
			const recordingResult = Array.from(event.results)
				.map((result: any) => result[0])
				.map((result) => result.transcript)
				.join('');
			console.log(recordingResult);
			setNote(recordingResult);
			microphone.onerror = (event: any) => {
				console.log(event.error);
			};
		};
	};

	const storeNote = () => {
		setnotesStore([...notesStore, note]);
		setNote('');
	};
	return (
		<>
			<h1>Record Voice Notes</h1>
			<div>
				<div className='noteContainer'>
					<h2>Record Note Here</h2>
					{isRecording ? (
						<span>Recording... </span>
					) : (
						<span>Stopped </span>
					)}
					<button
						className='button'
						onClick={storeNote}
						disabled={!note}
					>
						Save
					</button>
					<button
						onClick={() =>
							setisRecording((prevState) => !prevState)
						}
					>
						Start/Stop
					</button>
					<p>{note}</p>
				</div>
				<div className='noteContainer'>
					<h2>Notes Store</h2>
					**
					{notesStore.map((note) => (
						<p key={note}>{note}</p>
					))}
					**
				</div>
			</div>
			<div className='App'>
				<h1>React Text to Speech App</h1>
				<input
					type='text'
					value={ourText}
					placeholder='Enter Text'
					onChange={(e) => setOurText(e.target.value)}
				/>
				<button onClick={() => speechHandler(msg)}>SPEAK</button>
			</div>
		</>
	);
}

export default App;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import Modal from './modal'; // Import the Modal component
// import useSpeech from '../hooks/useSpeech';

// const SpeechComponent: React.FC = () => {
// 	const { isListening, setIsListening, showModal, transcript, setShowModal } =
// 		useSpeech();
// 	return (
// 		<div>
// 			<h1>Speech to Text & Text to Speech</h1>
// 			<button onClick={() => setIsListening((prev) => !prev)}>
// 				{isListening ? 'Stop Listening' : 'Start Listening'}
// 			</button>
// 			<p>Transcript: {transcript}</p>
// 			<Modal show={showModal} onClose={() => setShowModal(false)}>
// 				<p>Hello, I'm Iris. How can I assist you?</p>
// 			</Modal>
// 		</div>
// 	);
// };

// export default SpeechComponent;
