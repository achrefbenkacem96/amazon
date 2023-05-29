import axios from 'axios'
import React from 'react'

export default function Users({users}) {
   const handledelete = async (id)=>{
   const response = await axios.delete("http://localhost:8090/api/v1/auth/delete?id="+id )
   if (response.status === 200) {
    window.location.reload()
   }
   }
  return (
    <div>
       <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    firstName
                </th>
                <th scope="col" class="px-6 py-3">
                    lastName
                </th>
                <th scope="col" class="px-6 py-3">
                    email
                </th>
                <th scope="col" class="px-6 py-3">
                    role
                </th>
                <th scope="col" class="px-6 py-3">
                    action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user, i)=>(
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.firstname}
                        </th>
                        <td class="px-6 py-4">
                            {user.lastname}
                        </td>
                        <td class="px-6 py-4">
                            {user.email}
                        </td>
                        <td class="px-6 py-4">
                            {user.role}
                        </td>
                        <td class="px-6 py-4">
                           <div> <button onClick={ () => handledelete(user.id)}  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">delete</button> </div>
                          </td>
                    </tr>
                ) )
            }
            
        </tbody>
    </table>
        </div>
    </div>
  )
}
