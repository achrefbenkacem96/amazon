import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from 'react-currency-formatter';
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key)
export default function Checkout() {
    const  { data: session } = useSession()

    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const createCheckoutStripe = async () =>{
        const stripe = await stripePromise;
        const checkouSession = await axios.post('api/create-checkout-session',{
            items:items,
            email:session.user.email
        })
        const result = await stripe.redirectToCheckout({
            sessionId: checkouSession.data.id
        })
        if (result.error) alert(result.error.message)
    }
  return (
    <div className="bg-gray-100">
        <Header />
        <main className="lg:flex max-w-screen-2xl mx-auto">
            {/* left */}
            <div className="flex-grow m-5 shadow-md">
            <Image className="md:col-span-full"
            src="https://links.papareact.com/ikj" 
            alt=""
            width={1020}
            height={250}
            objectFit='contain'
            />
            <div className="flex flex-col p-5 space-y-10 bg-white">
                <h1 className="text-3xl border-b pb-4">{items.length === 0? 'Your Shooping Basket is empty': 'Shooping Basket'}</h1>
                {items.map((item, i) => 
                    <CheckoutProduct 
                    key={i} 
                    image={item.image}
                    description={item.description}
                    category={item.category}
                    price={item.price}
                    title={item.title}
                    id={item.id}
                    hasPrime={item.hasPrime}
                    rating={item.rating}
                    />
                )}
            </div>
            </div>
            {/* right */}
            <div className="flex flex-col bg-white p-10 shadow-md">
                {items.length > 0 && (<>
                <h2 className="whitespace-nowrap">Subtotal ({items.length} items) :{" "}
                <span className="font-bold"> <Currency quantity={total} currency="TND"/></span></h2>

                <button role="link" onClick={createCheckoutStripe} disabled={!session} className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-300 cursor-not-allowed"}` }>
                    {!session ? "Sign in to chekout" : "Proceed to checkout"}
                </button>
                </>)}
            </div>
        </main>
    </div>
  )
}
