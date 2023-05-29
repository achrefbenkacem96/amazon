import React, { useState } from 'react'
import { getSession, signOut, useSession } from "next-auth/react";
import Users from '../components/Users';
import Products from '../components/Products';
import axios from 'axios';
import { callSoapApi, callSoapMethod } from '../lib/soapClient';
import Profile from '../components/Profile';
import Image from 'next/image';
import { useRouter } from 'next/router';
 
const { parseString } = require('xml2js');
 
export default function DashboardAdmin({ users}) {
  const  { data: session } = useSession()
  const [activeLink, setActiveLink] = useState('users');
  const router = useRouter()

  const handleClick = (link) => {
    setActiveLink(link);
  };
  console.log("🚀 ~ file: UsersAdmin.js:6 ~ UsersAdmin ~ session:", session)

  return (
    <div className="min-h-full">
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
             </div>
             <div className="hidden md:flex items-center">
  <div className="ml-10 flex items-baseline space-x-4">
    <Image
      onClick={() => router.push("/")}
      src='https://links.papareact.com/f90'
      width={50}
      height={60}
      objectFit='contain'
      className='cursor-pointer'
    />
    <a
      onClick={() => handleClick('Profile')}
      className={`${
        activeLink === 'orders'
          ? 'bg-gray-900 text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium'
      }`}
    >
      Profile
    </a>
  </div>
 
</div>

          
          </div>
          
          <div className=" sm:flex text-white  text-xs  mx-6 ml-auto flex items-center space-x-4">
    <a
      onClick={() => signOut()}
      className="text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium"
    >
      Logout
    </a>
  </div>
        </div>
      </div>
  
       <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
           <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Users</a>
          <a href="#" className="bg-gray-900 text-white hover:text-white block rounded-md px-3 py-2 text-base font-medium">Products</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Orders</a>
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          
        </div>
      </div> 
    </nav>
  
    <header className="bg-white shadow">
      
    </header>
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      
       <Profile  />
       </div>
    </main>
  </div>
  )
}
export async function getServerSideProps (context){
  const session = await getSession(context);
  console.log("🚀 ~ file: index.js:27 ~ getServerSideProps ~ session:", session)
  let user
  if (session) {
    user = await axios.get('http://localhost:8090/api/v1/auth/user/'+session.user.email)
    console.log("🚀 ~ file: index.js:32 ~ getServerSideProps ~ user:", user.data)
    if (user.data.role == "ADMIN") {
      return {
        redirect: {
          destination: '/dashboardadmin',
          permanent: false,
        },
      };
    }
  }else{
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
   
  const users = []
   return {
    props :{
      users
    }
  }
 
}