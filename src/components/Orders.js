import Currency from 'react-currency-formatter';

export default function Orders({id, items, amount, images}) {
  return (
    <div className='relative border rounded-md'>
        <div className='flex items-center space-x-10 bg-gray-100 text-sm text-gray-600 '>
            <div>
                <p className='font-bold test-xs'>ORDER PLACED</p>
                <p></p>
            </div>

            <div>
                <p className='text-xs font-bold'> TOTAL</p>
                <p>
                  <Currency quantity={amount} currency="TND" />
                  {/* Delivery {" "}
                  <Currency quantity={amountShipping} currency="TND" /> */}
                </p>
            </div>

            <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-l text-right text-blue-500'>
                {items.length} items
            </p>
            <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
                  Order # {id}
            </p>
            <div className='p-5 sm:p-10'>
                <div className='flex overflow-x-auto space-x-6'>
                    {images.map((image)=>{
                        <img src={image} alt="" className='h-20 object-contain sm:h-32'/>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}
