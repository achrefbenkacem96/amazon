import { useState } from "react"
import Image from "next/image"
import { StarIcon } from "@heroicons/react/24/outline"
import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5
const MIN_RATING = 1
export default function Product({ image, description, category, price, title, id}) {
  const dispatch = useDispatch()
  const[rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) ) + MAX_RATING)
  const[hasPrime] = useState(Math.random() < 0.5)
  const addItemToBasket = () => {
    const product = { image, description, category, price, title, id, hasPrime, rating}
    dispatch(addToBasket(product))
  }
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
      <Image src={image} height={200} width={200} objectFit='contain' />
      <h4>{title} </h4>
      <div className="flex">
        {Array(rating).fill().map((_,i) =>
        (  <StarIcon className="h-5 text-yellow-500" key={i}/>)
        )}
      </div>
      <div className="text-xs my-2 line-clamp-2">{description}</div>
      <div className="mb-5"><Currency quantity={price} currency="TND" /></div>
      {hasPrime && 
      (
        <div className="flex items-center space-x-2 -mt-5">
          <img src="https://links.papareact.com/fdw" alt="prime" className=" w-12"/>
          <div className="text-xs text-gray-500 ">
            FREE Nesxt-day Delivery
          </div>
        </div>
      )}
      <button className="mt-auto button" onClick={addItemToBasket}>Add to Basket</button>
    </div>
  )
}
