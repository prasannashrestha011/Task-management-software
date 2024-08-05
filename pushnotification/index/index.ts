import express, {  json, Request, Response } from 'express';
import cors from 'cors'
const app = express();
app.use(express.json())
import admin from 'firebase-admin';

import  serviceAccount from './taskmanagementapp-bf847-firebase-adminsdk-w1pr9-896189edcc.json';
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};
app.use(cors(corsOptions))
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});
const messaging=admin.messaging()
const db=admin.firestore()
app.get('/home', (req: Request, res: Response) => {
    res.send('hi');
});
app.post('/sendnotification',(req:Request,res:Response)=>{
    const token=req.query.token as string
    const message={
        notification:{
            title:'hello its me!!',
            body:"hi I am using pushnotification services from firebase cloud "
        },
        token:`${token}`
    }
    messaging.send(message).then((response)=>console.log(response)).catch(err=>console.log(err))
    res.send('message send successfully')
})
app.listen(8082, () => {
    console.log('Push notification server running on port 8082');
});
app.get('/set-fcm-token',async(req:Request,res:Response)=>{
    const fcmToken=req.query.token as string
    const userID=req.query.userID as string
    console.log(fcmToken,"  ",userID)
    if(!fcmToken||!userID){
        res.status(404).send('token or user Id not found')
    }
    try{
        const userRef=db.collection('users').doc(userID)
        await userRef.set({
            fcmToken:fcmToken
        })
        console.log('user fcm token saved to firebase')
        res.status(200).send("fcm token stored")
    }catch(err){
        console.log(err)
        res.status(500).send("internal server error")
    }
})
app.get('/get-users',async(req:Request,res:Response)=>{
    try{
        const userRef=db.collection('users')
        const snapshot=await userRef.get()
        if(snapshot.empty){
            console.log('collection empty!!!')
            res.status(404).send('collection is empty!!!')
        }
        const tokens:string[]=[]
        snapshot.forEach(doc=>{
            const data=doc.data()
             if (data.fcmToken){
                tokens.push(data.fcmToken)
             }
        })
        res.status(200).send(tokens)
    }catch(err){
        console.log(err)
    }
})
app.post('/send-message',async(req:Request,res:Response)=>{
    try{
        const userRef=db.collection('users')
        const snapshot=await userRef.get()
         if(snapshot.empty){
            res.status(404).send('No user found')
         }
        
         snapshot.forEach(doc=>{
            const data=doc.data()
             if(data.fcmToken){
                const message={
                    notification:{
                        title:"Hello all users from server",
                        body:"This is a test message to all users"
                    },
                    token:data.fcmToken
                }
                messaging.send(message).then(res=>console.log(res)).catch(err=>console.log(err))
             }
         })
         res.status(200).send("Notificaton sent to all users")
    }catch(err){
        console.log(err)
    }
})
app.post('/send-assign-to-message',async(req:Request,res:Response)=>{
    const userIDList:string[]=req.body.userIDList
    
    if(!userIDList || userIDList.length==0) res.status(400).send("User id not found")
        const userIDs = userIDList.map(item => item.split('**')[0]);
    console.log(userIDs)
    userIDs.map(async id=>{
        const userRef=db.collection('users').doc(id)
        const doc=await userRef.get()
        if(doc.exists){
            const data=doc.data()
             if(data&&data.fcmToken){
                const message={
                    notification:{
                        title:"You have been assigned a new Task",
                        body:"You have been assigned to new Task,You may check it out !!",
                    },
                    token:data.fcmToken
                }
                messaging.send(message).then(res=>console.log(res)).catch(err=>{
                    console.log(err ," is from sss")
                    res.status(404).send('fcm token expired , generate new ')
                })
             }
        }
    })
})