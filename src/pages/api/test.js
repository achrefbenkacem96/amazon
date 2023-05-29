import * as admin from 'firebase-admin';
const serviceAccount = require('../../../permission.json')

// const app =   admin.initializeApp({credential:admin.credential.cert(serviceAccount)})  
export default async (req , res) =>{
    console.log(admin.app);
    // app.firestore().collection('test').set({'test':"test"})
}