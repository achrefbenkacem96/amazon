import axios from 'axios'
import React, { useState } from 'react'

export default function registre() {
  const [firstname, setFirstname] =useState()
  const [lastname, setLastname] =useState()
  const [email, setEmail] =useState()
  const [password, setPassword] =useState()
  const hundelSubmit = async ()=>{
    const body = {firstname,lastname,email,password}
    const response = await axios.post("http://localhost:8090/api/v1/auth/register",body)
    console.log("🚀 ~ file: registre.js:12 ~ hundelSubmit ~ body:", body)
    console.log(response.data);
    if (response.status == 200) {
      window.location.href = '/'
    }
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className=" ">
    <div className=" ">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
 
      
    </div>

    <div className="  ">
     
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <div className="mt-2">
            <input type="text" name="first-name" onChange={(e) => setFirstname(e.target.value)} id="first-name"  autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <div className="mt-2">
            <input type="text" name="last-name" onChange={(e) => setLastname(e.target.value)} id="last-name"  autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email"onChange={(e) => setEmail(e.target.value)}  autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">password</label>
          <div className="mt-2">
            <input id="password" name="password" type="password"onChange={(e) => setPassword(e.target.value)}  autoComplete="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

 
      </div>
    </div>

 
  </div>

  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">reset</button>
    <button type="button" onClick={hundelSubmit} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
  </div>
     </div>
  )
}
