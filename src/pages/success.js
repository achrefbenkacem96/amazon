import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Header from "../components/Header";
import { useRouter } from 'next/router';

export default function success() {
    const router  = useRouter()
  return (
    <div className='bg-gray-100 h-screen'>
        <Header />
        <main className='max-w-screen-lg mx-auto'>
            <div>
                <div className=' flex flex-col p-10 bg-white'>
                    <div className=' flex items-center space-x-2 mb-5'>
                    <CheckCircleIcon className='text-green-500 h-10' />
                        <h1 className='text-3xl'>Thank you, your order has been confirmed!</h1>
                    </div>
                    <p>
                        Thank you for shopping with us, we'll send a confirmation once item has shipped. if you would to check the status of your order(s) 
                        please press this link below.
                    </p>
                </div>
            </div>
        </main>
    </div>
  )
}
