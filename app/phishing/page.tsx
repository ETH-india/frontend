import React from 'react'

const Hello = () => {
  return (
    <main className="flex bg-[#1c1c1c] min-h-screen flex-col items-center justify-between p-24">
    <div className='flex flex-col border-[#ef2d2d] border-solid border m-auto bg-[#131313] w-[27rem] h-[24rem] rounded-xl overflow-hidden'>
      <div className='h-[7rem] flex mt-8 bg-[#1b1b1b] mx-3 rounded-lg'>
        <div className='flex flex-col'>
          <div className='ml-3 mt-4 text-sm text-gray-400'> You Pay</div>
          <input className='ml-3 mt-4 text-gray-400 bg-transparent text-lg border-none outline-none' placeholder='0.00'/>
        </div>
        <div className='flex flex-col justify-center items-end mr-5 w-full'>
          <div className='border border-white w-[7rem] h-8 rounded-2xl text-center flex justify-center items-center font-semibold tracking-wide'> ETH </div>
        </div>
      </div>
      <svg className='my-2 w-[2rem] h-[2rem] m-auto' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
      </svg>
      <div className='h-[7rem] flex  bg-[#1b1b1b] mx-3 rounded-lg'>
         <div className='flex flex-col'>
            <div className='ml-3 mt-4 text-sm text-gray-400'> You Receive </div>
            <input className='ml-3 mt-4 text-gray-400 bg-transparent text-lg border-none outline-none' placeholder='0.00'/>
          </div>
          <div className='flex flex-col justify-center items-end mr-5 w-full'>
            <div className='border border-white w-[7rem] h-8 rounded-2xl text-center flex justify-center items-center font-semibold tracking-wide'> USDC </div>
          </div>
      </div>
      <button className='bg-[#e776c2] h-10 w-[13rem] rounded-xl m-auto'> Approve </button>
    </div>
  </main>
  )
}

export default Hello