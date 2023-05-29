import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import React from 'react'
import db from '../../utils/firebase';
import Header from "../components/Header";
import Orders from '../components/Orders';

export default function orders({orders}) {
    console.log(orders);
    const  { data: session } = useSession()
  return (
    <div className='  h-screen'>
        <Header />
        <main className='max-w-screen-lg mx-auto P61'>
            <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
                Your orders
            </h1>
            {session ?(<h2>{orders.length} Orders</h2>): (<h2> Please sign in to see your orders</h2>)}
            <div className='mt-5 space-y-4 '>
                {orders.map(({id, items, amount, images}) => (
                    <Orders 
                    key={id}
                    id={id}
                    items={items}
                    amount={amount}
                    images={images}
                    />
                ))}
            </div>
        </main>
    </div>
  )
}
export async function getServerSideProps(context){
 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
 const session = await getSession(context)
 if (!session) {
    return {
        props:{}
    }    
 }   
 const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp','desc').get()
 const orders = await Promise.all(
    stripeOrders.docs.map(async (order)=>({
        orderData: JSON.stringify(order.data()),
            id: order.id,
            amount: order.data().amount,
            images: order.data().images,
            // timestamp: moment(order.data().timestamp?.toData()).unix(),
            items:(
                await stripe.checkout.sessions.listLineItems(order.id,{limit:100})
            ).data
    }))
 )
 return {
    props:{orders}
}   
}