import React, { useState } from 'react'
import { Button, Dropdown, Modal, TextInput } from "flowbite-react";
import axios from 'axios';

export default function AddProduct() {
     const [title, setTitle] =useState()
    const [price, setPrice] =useState()
    const [description, setDescription] =useState()
    const [category, setCategory] =useState()
    const [image, setImage] =useState()
    const [rate, setRate] =useState()
    const [count, setCount] =useState()
    const hundelSubmit = async ()=>{
        let data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prod="http://product.eCommerceSoap.example.com/">
        <soapenv:Header/>
        <soapenv:Body>
           <prod:addProduct>
              <!--Optional:-->
              <product>
                 <!--Optional:-->
                 <category>${category}</category>
                 <!--Optional:-->
                 <description>${description}</description>
                
                 <image>${image}</image>
                 <price>${price}</price>
                 <!--Optional:-->
                 <rating>
                    <count>${count}</count>
                    <rate>${rate}</rate>
                 </rating>
                 <!--Optional:-->
                 <title>${title}</title>
              </product>
           </prod:addProduct>
        </soapenv:Body>
     </soapenv:Envelope>`;
       const response =  await axios.post("/api/soap",{data:data})
       console.log("🚀 ~ file: AddProduct.js:39 ~ hundelSubmit ~ response:", response.data)
       if (response.status = 200) {
        window.location.reload()
    }
       
    }
    const [show,setShow] = useState(false)
    const onClick =()=>{setShow(true)}
    const onClose =()=>{setShow(false)}
  return (
    <div>
 <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add product
</button>

 <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="  ">
     
     <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
       <div className="sm:col-span-3">
         <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
         <div className="mt-2">
           <input type="text" name="first-name" onChange={(e) => setTitle(e.target.value)} id="first-name"  autoComplete="given-name" />
         </div>
       </div>

       <div className="sm:col-span-3">
         <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
         <div className="mt-2">
           <input type="text" name="last-name" onChange={(e) => setPrice(e.target.value)} id="last-name"  autoComplete="family-name" />
         </div>
       </div>

       <div className="sm:col-span-3">
         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
         <div className="mt-2">
           <input id="email" name="email" type="email"onChange={(e) => setDescription(e.target.value)}  autoComplete="email" />
         </div>
       </div>

       <div className="sm:col-span-3">
         <label htmlFor="Category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
         <div className="mt-2">
           <input id="Category" name="Category" type="text"onChange={(e) => setCategory(e.target.value)}  autoComplete="password" />
         </div>
       </div>
       <div className="sm:col-span-3">
         <label htmlFor="Image" className="block text-sm font-medium leading-6 text-gray-900">Image</label>
         <div className="mt-2">
           <input id="Image" name="Image" type="text"onChange={(e) => setImage(e.target.value)}  autoComplete="password" />
         </div>
       </div>
       <div className="sm:col-span-3">
         <label htmlFor="Rate" className="block text-sm font-medium leading-6 text-gray-900">Rate</label>
         <div className="mt-2">
           <input id="Rate" name="Rate" type="text"onChange={(e) => setRate(e.target.value)}  autoComplete="password" />
         </div>
       </div>
       <div className="sm:col-span-3">
         <label htmlFor="Count" className="block text-sm font-medium leading-6 text-gray-900">Count</label>
         <div className="mt-2">
           <input id="Count" name="Count" type="text"onChange={(e) => setCount(e.target.value)}  autoComplete="password" />
         </div>
       </div>


     </div>
   </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={hundelSubmit} class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
