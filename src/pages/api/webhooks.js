import { buffer } from 'micro';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../permission.json')
const app = !admin.app.length ? admin.initializeApp({credential:admin.credential.cert(serviceAccount)}) : admin.app()
console.log(admin.app);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_SIGNING_SECRET
const fullfillOrder = async(session) =>{
    return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set({
        amount: session.amount_total / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }).then(()=> console.log("succes"))
}
export default async (req , res) =>{
    if (req.method == 'POST') {
        const requestBuffer = await buffer(req);
        const payload       = requestBuffer.toString()
        const sig           = req.headers["stripe-signature"]
        let event
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {
            console.log(error);
            return res.status(400).send(`Webhook error: ${error.message}`)
        }
        if (event.type == 'checkout.session.completed') {
            const session = event.data.object;
            return fullfillOrder(session).then(() => res.status(200)).catch((err)=> console.log(err))
        }
    }
}
export const config ={
    api:{
        bodyParser:false,
        externalResolver:true
    }
}