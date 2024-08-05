
import admin from 'firebase-admin';
import serviceAccount from './taskmanagementapp-bf847-firebase-adminsdk-w1pr9-896189edcc.json';
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})
export const saveUserFCMToken=async(fcmToken,userID)=>{
    const userRef=db.collection('users').doc(userID)
    const tokenData={
        fcmToken:fcmToken,
    }
    await userRef.set(tokenData)
    console.log('fcm token saved')
}
const sendNotification=async(token)=>{
    
    const messageSend={
        token:token,
        notification:{
            title:"hello",
            body:"hello world"
        }
    }
    admin.messaging().send(messageSend).then(res=>console.log(res)).catch(err=>console.log(err))
}
token=`dtQCLHsRGyuiZ6WcjJkeB5:APA91bECtT0gmYxiSM6iN6Mo3JuPOYX_gkrVtHeJIgk4KvMt0-jO1X3813J_HE2nMVjhCNzEmqbaDW_vFtUtFnTSgnbiHmjKPM6UBOwAQhBXAUaJ2w1h8dKGi7-FFRoBNRX5rvCeUs4Y`
sendNotification(token)