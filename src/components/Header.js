import Image from 'next/image'
import { Bars4Icon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
export default function Header({role}) {
  const  { data: session } = useSession()
  console.log("🚀 ~ file: Header.js:9 ~ Header ~ session:", session)
  const router = useRouter()
  const items = useSelector(selectItems)
  return (
    <header>
      {/*Top Nav*/}
      <div className="flex item-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
          onClick={() => router.push("/")}
          src='https://links.papareact.com/f90'
          width={150}
          height={40}
          objectFit='contain'
          className='cursor-pointer'
          />
        </div>
        {/* search */}
        <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer ">
          <input className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-none" type="text" />
          <MagnifyingGlassIcon className='h-12 p-4' />
        </div>
        {/* Right */}
        <div className='text-white flex items-center text-xs space-x-6 mx-6 '>
          <div className='link'onClick={() => session ? role ==="USER" ? router.push("/dashboard") : router.push("dashboardadmin"):signIn() } >
            <p  >{session ?`Hello ${session.user.name}`: 'Sign In'}</p>
            <p className='font-extrabold sm:text-sm'>Acount & Lists</p>
          </div>

          <div className='link'>
       
            {!session &&<p className='font-extrabold sm:text-sm' onClick={() =>  router.push("/registre")}>Registre</p>}
          </div>

          <div className='relative  flex items-center cursor-pointer link' onClick={()=> router.push("/checkout")}>
            <span className='absolute top-0 right-0 md:right-10 text-center bg-yellow-400 rounded-full h-4 w-4 text-black font-blod'>{items.length}</span>
            <ShoppingCartIcon className='h-10' />
            <p className='hidden sm:flex font-extrabold sm:text-sm'>Basket</p>
          </div>
        </div>
      </div>

      {/*Button Nav*/}
      <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
        <p className=' flex items-center link'>
        <Bars4Icon className='h-6 mr-1' />
          All
        </p>
        <p className='link'>Prime Video </p>
        <p className='link'>Amazon Bussiness </p>
        <p className='link'>Today's Deals </p>
        <p className='hidden lg:inline-flex link'>Electronics </p>
         <p className='hidden lg:inline-flex link'>prime </p>
 
      </div>
    </header>
  )
}
