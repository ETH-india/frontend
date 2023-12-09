'use client';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import useWalletFunctions from '../hooks/useWalletFunctions';
import { modalAtom } from '../store/modalStore';

const Hello = () => {
	const [atom, setAtom] = useAtom(modalAtom);
	const [showModal, setShowModal] = useState(false);
	const [connectedLabel, setConnectedLabel] = useState('Connect');

	const { connect, setData, connected, data, walletOperations } =
		useWalletFunctions();

	useEffect(() => {
		if (connected) {
			setConnectedLabel('Connected');
		}
	}, [connected, data]);
	return (
		<main className='flex bg-[#1c1c1c] min-h-screen flex-col items-center justify-between'>
			<nav className='mt-8 mr-auto ml-14'>
				<button
					className={`bg-[#e776c2] h-10 w-[13rem] rounded-xl m-auto`}
					onClick={() => {
						setShowModal(true);
					}}
				>
					{' '}
					{connectedLabel}
				</button>
			</nav>
			<div className='flex flex-col border-[#ef2d2d] border-solid border m-auto bg-[#131313] w-[27rem] h-[24rem] rounded-xl overflow-hidden'>
				<div className='h-[7rem] flex mt-8 bg-[#1b1b1b] mx-3 rounded-lg'>
					<div className='flex flex-col'>
						<div className='ml-3 mt-4 text-sm text-gray-400'>
							{' '}
							You Pay
						</div>
						<input
							className='ml-3 mt-4 text-gray-400 bg-transparent text-lg border-none outline-none'
							placeholder='3.00'
						/>
					</div>
					<div className='flex flex-col justify-center items-end mr-5 w-full'>
						<div className='border border-white w-[7rem] h-8 rounded-2xl text-center flex justify-center items-center font-semibold tracking-wide'>
							{' '}
							ETH{' '}
						</div>
					</div>
				</div>
				<svg
					className='my-2 w-[2rem] h-[2rem] m-auto'
					fill='none'
					stroke='currentColor'
					strokeWidth={1.5}
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75'
					/>
				</svg>
				<div className='h-[7rem] flex  bg-[#1b1b1b] mx-3 rounded-lg'>
					<div className='flex flex-col'>
						<div className='ml-3 mt-4 text-sm text-gray-400'>
							{' '}
							You Receive{' '}
						</div>
						<input
							className='ml-3 mt-4 text-gray-400 bg-transparent text-lg border-none outline-none'
							placeholder='7062.90'
						/>
					</div>
					<div className='flex flex-col justify-center items-end mr-5 w-full'>
						<div className='border border-white w-[7rem] h-8 rounded-2xl text-center flex justify-center items-center font-semibold tracking-wide'>
							{' '}
							USDC{' '}
						</div>
					</div>
				</div>
				<button
					onClick={() =>
						walletOperations(
							'approve this transaction of swap 3 ETH to USDC',
						)
					}
					className='bg-[#e776c2] h-10 w-[13rem] rounded-xl m-auto'
				>
					{' '}
					Approve{' '}
				</button>
			</div>
			<div
				className={`fixed bg-[#0000006e] inset-0 ${
					showModal ? '' : 'hidden'
				}`}
			>
				<div className='w-[35rem] flex flex-col relative h-[20rem] bg-[#3b3b3b] rounded-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<svg
						onClick={() => setShowModal(false)}
						className='absolute cursor-pointer w-7 h-7 right-[2%] top-[3%]'
						fill='none'
						stroke='currentColor'
						strokeWidth={1.5}
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
					<div className='p-8 rounded-[6px] border border-solid border-white h-full m-10 mt-8'>
						<div className='flex flex-col'>
							<h2>Connect with IRIS :)</h2>
							<button
								onClick={async () => {
									setAtom(true);
									await connect();
									setShowModal(false);
								}}
							>
								{connectedLabel}
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Hello;
