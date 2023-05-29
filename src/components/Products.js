import React, { useState } from 'react'
import AddProduct from './AddProduct'
import axios from 'axios'

export default function Products({products}) {
   const handledelete = async(id)=>{
    const data =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prod="http://product.eCommerceSoap.example.com/">
    <soapenv:Header/>
    <soapenv:Body>
       <prod:deleteProduct>
          <!--Optional:-->
          <id>${id}</id>
       </prod:deleteProduct>
    </soapenv:Body>
 </soapenv:Envelope>`
 const response =  await axios.post("/api/soap",{data:data})
    if (response.status = 200) {
        window.location.reload()
    }
   }
   const [title, setTitle] =useState()
   const [price, setPrice] =useState()
   const [description, setDescription] =useState()
   const [category, setCategory] =useState()
   const [image, setImage] =useState()
   const [rate, setRate] =useState()
   const [count, setCount] =useState()
   const hundelSubmit = async (product)=>{
       let data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prod="http://product.eCommerceSoap.example.com/">
       <soapenv:Header/>
       <soapenv:Body>
          <prod:updateProduct>    
             <!--Optional:-->
             <product>
                <!--Optional:-->
                <category>${category|| product.category}</category>
                <!--Optional:-->
                <description>${description|| product.description}</description>
               <id>${ product.id }</id>
                <image>${ image||product.image}</image>
                <price>${ price||product.price}</price>
                <!--Optional:-->
                <rating>
                   <count>${ count||product.rating.count}</count>
                   <rate>${ rate||product.rating.rate}</rate>
                </rating>
                <!--Optional:-->
                <title>${title||product.title}</title>
                </product>

                <id>${product.id }</id>
                </prod:updateProduct>
             </soapenv:Body>
          </soapenv:Envelope>`;
      const response =  await axios.post("/api/soap",{data:data})
      console.log("🚀 ~ file: AddProduct.js:39 ~ hundelSubmit ~ response:", response.data)
      if (response.status = 200) {
       window.location.reload()
   }
      
   }
  return (
    <div>
      <AddProduct />
   
       <div className="relative overflow-x-auto">
  
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                id
                </th>
                <th scope="col" className="px-6 py-3">
                title
                </th>
                <th scope="col" className="px-6 py-3">
                price
                </th>
                <th scope="col" className="px-6 py-3">
                description
                </th>
                <th scope="col" className="px-6 py-3">
                category
                </th>
                <th scope="col" className="px-6 py-3">
                image
                </th>
                <th scope="col" className="px-6 py-3">
                rate
                </th>
                <th scope="col" className="px-6 py-3">
                count
                </th>
                <th scope="col" className="px-6 py-3">
                action
                </th>
            </tr>
        </thead>
        <tbody>
            {products.length > 0 && products?.map((product, i) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.id}
                </th>
                <td className="px-6 py-4">
                {product.title}
                </td>
                <td className="px-6 py-4">
                {product.price}
                </td>
                <td className="px-6 py-4">
                     {product.description}
                </td>
                <td className="px-6 py-4">
                     {product.category}
                </td>
                <td className="px-6 py-4">
                     {product.image}
                </td>
                <td className="px-6 py-4">
                     {product.rating.rate}
                </td>
                <td className="px-6 py-4">
                     {product.rating.count}
                </td>
                <td className="px-6 py-4">
                <div className='grid grid-flow-col gap-4'> <button   className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" data-bs-toggle="modal" data-bs-target="#updateModal">update</button>
                <button onClick={ () => handledelete(product.id)}  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">delete</button>
                  </div>
        <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="updateModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="  ">
     
     <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
       <div className="sm:col-span-3">
         <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Title </label>
         <div className="mt-2">
           <input type="text" name="first-name" placeholder={product.title}  onChange={(e) => setTitle(e.target.value)} id="first-name"  autoComplete="given-name" />
         </div>
       </div>

       <div className="sm:col-span-3">
         <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
         <div className="mt-2">
           <input type="text" name="last-name"  placeholder={product.price} onChange={(e) => setPrice(e.target.value)} id="last-name"  autoComplete="family-name" />
         </div>
       </div>

       <div className="sm:col-span-3">
         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
         <div className="mt-2">
           <input id="email" name="email" placeholder={product.description} type="email"onChange={(e) => setDescription(e.target.value)}  autoComplete="email" />
         </div>
       </div>

       <div className="sm:col-span-3">
         <label htmlFor="Category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
         <div className="mt-2">
           <input id="Category" name="Category" placeholder={product.category} type="text"onChange={(e) => setCategory(e.target.value)}  autoComplete="password" />
         </div>
       </div>
       <div className="sm:col-span-3">
         <label htmlFor="Image" className="block text-sm font-medium leading-6 text-gray-900">Image</label>
         <div className="mt-2">
           <input id="Image" name="Image" placeholder={product.image}  type="text"onChange={(e) => setImage(e.target.value)}  autoComplete="password" />
         </div>
       </div>
       <div className="sm:col-span-3">
         <label htmlFor="Rate" className="block text-sm font-medium leading-6 text-gray-900">Rate</label>
         <div className="mt-2">
           <input id="Rate" name="Rate" placeholder={product.rating.rate} type="text"onChange={(e) => setRate(e.target.value)}  autoComplete="password" />
         </div>
       </div>
       <div className="sm:col-span-3">
         <label htmlFor="Count" className="block text-sm font-medium leading-6 text-gray-900">Count</label>
         <div className="mt-2">
           <input id="Count" name="Count" placeholder={product.rating.count} type="text" onChange={(e) => setCount(e.target.value)}  autoComplete="password" />
         </div>
       </div>


     </div>
   </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={() => hundelSubmit(product)} class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

                </td>
            </tr>
            ))
           }
        </tbody>
    </table>
        </div>
    </div>
  )
}
