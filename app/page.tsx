'use client';
import { ethers } from 'ethers';
import Safe, {
	EthersAdapter,
	SafeFactory,
	SafeAccountConfig,
} from '@safe-global/protocol-kit';
import SafeApiKit from '@safe-global/api-kit';
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types';

export default function Home() {
	const createAccount = async () => {
		const wallet = ethers.Wallet.createRandom();

		const RPC_URL = 'https://eth-goerli.public.blastapi.io';
		const provider = new ethers.JsonRpcProvider(RPC_URL);

		const owner1Signer = new ethers.Wallet(
			'b32da80186b4d6e50de0cbe35c93cad33c64eb6cc0ed0ff5c52dda8b8be2a596',
			provider,
		); //change

		const ethAdapterOwner1 = new EthersAdapter({
			ethers,
			signerOrProvider: owner1Signer,
		});

		const safeApiKit = new SafeApiKit({
			chainId: BigInt(5),
		});

		const safeFactory = await SafeFactory.create({
			ethAdapter: ethAdapterOwner1,
		});

		const safeAccountConfig: SafeAccountConfig = {
			owners: [await owner1Signer.getAddress()],
			threshold: 1,
			// ... (Optional params)
		};

		const safeSdkOwner1 = await safeFactory.deploySafe({
			safeAccountConfig,
		});

		const safeAddress = await safeSdkOwner1.getAddress();

		console.log('Your Safe has been deployed:');
		console.log(`https://goerli.etherscan.io/address/${safeAddress}`);
		console.log(`https://app.safe.global/gor:${safeAddress}`);
	};

	const doATxn = async () => {
		//get deployed safe
		//get users address
		//do a sample txn

		// Any address can be used. In this example you will use vitalik.eth
		const destination = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
		const amount = ethers.parseUnits('0.00005', 'ether').toString();

		const safeTransactionData: MetaTransactionData = {
			to: destination,
			data: '0x',
			value: amount,
		};

		const RPC_URL = 'https://eth-goerli.public.blastapi.io';
		const provider = new ethers.JsonRpcProvider(RPC_URL);

		const owner1Signer = new ethers.Wallet(
			'b32da80186b4d6e50de0cbe35c93cad33c64eb6cc0ed0ff5c52dda8b8be2a596',
			provider,
		); //change

		const ethAdapter = new EthersAdapter({
			ethers,
			signerOrProvider: owner1Signer,
		});

		const safeAddress = '0xB47Ee10d9209a5389eFDe55cd3A1B006791b4630';

		const safeSdk = await Safe.create({ ethAdapter, safeAddress });

		// Create a Safe transaction with the provided parameters
		const safeTransaction = await safeSdk.createTransaction({
			transactions: [safeTransactionData],
		});

		// Deterministic hash based on transaction parameters
		const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);

		// Sign transaction to verify that the transaction is coming from owner 1
		const senderSignature = await safeSdk.signTransactionHash(safeTxHash);

		const safeService = new SafeApiKit({
			chainId: BigInt(5),
		});

		await safeService.proposeTransaction({
			safeAddress,
			safeTransactionData: safeTransaction.data,
			safeTxHash,
			senderAddress: await owner1Signer.getAddress(),
			senderSignature: senderSignature.data,
		});

		const pendingTransactions = (
			await safeService.getPendingTransactions(safeAddress)
		).results;

		const executeTxResponse = await safeSdk.executeTransaction(
			safeTransaction,
		);
		const receipt = await executeTxResponse.transactionResponse?.wait();

		console.log('Transaction executed:');
		console.log(`https://goerli.etherscan.io/tx/${receipt}`);
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='flex flex-col border-[#757575] border-solid border m-auto bg-[#131313] w-[27rem] h-[24rem] rounded-xl overflow-hidden'>
				<div className='h-[7rem] flex mt-8 bg-[#1b1b1b] mx-3 rounded-lg'>
					<div className='flex flex-col'>
						<div className='ml-3 mt-4 text-sm text-gray-400'>
							{' '}
							You Pay
						</div>
						<input
							className='ml-3 mt-4 text-gray-400 bg-transparent text-lg border-none outline-none'
							placeholder='0.00'
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
							placeholder='0.00'
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
					onClick={() => {
						doATxn();
					}}
					className='bg-[#e776c2] h-10 w-[13rem] rounded-xl m-auto'
				>
					{' '}
					Approve{' '}
				</button>
			</div>
		</main>
	);
}
