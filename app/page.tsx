"use client"
import { ethers } from 'ethers'
import Image from 'next/image'
import { EthersAdapter, SafeFactory, SafeAccountConfig  } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types'

export default function Home() {

  const createAccount = async () => {
    const wallet = ethers.Wallet.createRandom()

    const RPC_URL='https://eth-goerli.public.blastapi.io'
    const provider = new ethers.JsonRpcProvider(RPC_URL)
  
    const owner1Signer = new ethers.Wallet("b32da80186b4d6e50de0cbe35c93cad33c64eb6cc0ed0ff5c52dda8b8be2a596", provider) //change
  
    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer
    })

    const safeApiKit = new SafeApiKit({
      chainId: BigInt(5)
    })

    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
  
    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await owner1Signer.getAddress(),
      ],
      threshold: 1,
      // ... (Optional params)
    }
  
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
  
    const safeAddress = await safeSdkOwner1.getAddress()
  
    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)

  }

  // const doTxn = async () => {
  //   const signer = provider.getSigner()

  //   // Create the Safe EthersAdapter
  //   const ethAdapter = new EthersAdapter({
  //     ethers,
  //     signerOrProvider: signer || provider,
  //   })
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col m-auto bg-gray-400 w-[27rem] h-[22rem] rounded-xl overflow-hidden'>
        <div className='h-[7rem] w-full bg-slate-50 '></div>
        <div className='my-5 w-[2rem] h-[2rem] bg-gray-500 m-auto'></div>
        <div className='h-[7rem] w-full bg-slate-50 '></div>
        <button></button>
      </div>
    </main>
  )
}
