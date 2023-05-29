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
 
export default function DashboardAdmin({products,  users}) {
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
            <div className="hidden md:block">
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
        onClick={() => handleClick('users')}
        className={`${
          activeLink === 'users'
            ? 'bg-gray-900 text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium'
        }`}
      >
        Users
      </a>
      <a
        onClick={() => handleClick('products')}
        className={`${
          activeLink === 'products'
            ? 'bg-gray-900 text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium'
        }`}
      >
        Products
      </a>
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
      { activeLink === 'users' && <Users users={users} />}
      { activeLink === 'products' && <Products products={products} />}
      { activeLink === 'Profile' && <Profile  />}
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
    if (user.data.role == "USER") {
      return {
        redirect: {
          destination: '/dashboard',
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
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prod="http://product.eCommerceSoap.example.com/">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <prod:getAllProducts/>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>';

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8081/myWebService',
  headers: { 
    'Content-Type': 'text/xml'
  },
  data : data
};

const products = await axios.request(config)
  .then(async (response) => {
    let xmlData = response.data;
    console.log("🚀 ~ file: dashboardadmin.js:106 ~ .then ~ response.data:", response.data)
    return new Promise((resolve, reject) => {
      parseString(xmlData, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const products = result["S:Envelope"]["S:Body"][0]["ns2:getAllProductsResponse"][0]?.return;
          console.log("🚀 ~ file: dashboardadmin.js:113 ~ parseString ~ products:", products)
           
          const transformedData = products?.map(product => {
            const id = parseInt(product.id[0]);
            const title = product.title[0];
            const price = parseFloat(product.price[0]);
            const description = product.description[0];
            const category = product.category[0];
            const image = product.image[0];
            const rating = {
              rate: parseFloat(product.rating[0].rate[0]),
              count: parseInt(product.rating[0].count[0])
            };

            return {
              id,
              title,
              price,
              description,
              category,
              image,
              rating
            };
          });

          console.log(transformedData);
          resolve(transformedData);
        }
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
  console.log("🚀 ~ file: dashboardadmin.js:145 ~ getServerSideProps ~ products:", products)
  const users = await axios.get('http://localhost:8090/api/v1/auth/getAll').then(res => res.data)
   return {
    props :{
      products:products || "",
      users
    }
  }
 
}