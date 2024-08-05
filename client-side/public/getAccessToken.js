const { GoogleAuth } = require('google-auth-library');
const serviceAccount = require('./taskmanagementapp-bf847-firebase-adminsdk-w1pr9-896189edcc.json');

const getAccessToken = async () => {
    const auth = new GoogleAuth({
        credentials: serviceAccount,
        scopes: ['https://www.googleapis.com/auth/firebase.messaging']
    });

    try {
        const accessToken = await auth.getAccessToken();
        console.log('Access Token:', accessToken);
        return accessToken;
    } catch (err) {
        console.error('Error fetching access token:', err);
        throw err;
    }
};

module.exports = getAccessToken;

