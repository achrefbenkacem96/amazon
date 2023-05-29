import { StarIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

export default function CheckoutProduct({ image, description, category, rating, price, title, id,hasPrime}) {
    const dispatch = useDispatch()
  const addItemToBasket = () =>{
    dispatch(addToBasket({ image, description, category, rating, price, title, id,hasPrime}))
  }
  const removeItemToBasket = () =>{
    dispatch(removeFromBasket({id}))
  }
  return (<div className='grid grid-cols-5 '>
        <Image src={image} width={200} height={200} objectFit='contain' />
        
        <div className='col-span-3 mx-5'>
            <p>{title}</p>
            <div className='flex'>
                {Array(rating).fill().map((_,i) => 
                <StarIcon className='h-5' key={i}/>)}
            </div>
            <p className='text-xs my-2 line-clamp-3'>{description}</p>
            <Currency quantity={price} currency='TND' />
            {hasPrime && (<div className='flex items-center space-x-2'>
            <img loading='lazy' src="https://links.papareact.com/fdw" alt="prime" className=" w-12"/>
            <div className="text-xs text-gray-500 ">
                FREE Nesxt-day Delivery
            </div>
            </div>)}
        </div>
                    {/* right add/remove */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button className='button' onClick={addItemToBasket}>Add to basket</button>
            <button className='button' onClick={removeItemToBasket}>remove from basket</button>
        </div>
    </div>
  )
}
