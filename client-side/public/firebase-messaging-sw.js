
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


firebase.initializeApp({
  
    apiKey: "AIzaSyA7GdIB4p0QwNq4tG-Xm9VgusbTpMxZmy0",
    authDomain: "taskmanagementapp-bf847.firebaseapp.com",
    projectId: "taskmanagementapp-bf847",
    storageBucket: "taskmanagementapp-bf847.appspot.com",
    messagingSenderId: "131328044427",
    appId: "1:131328044427:web:897448a75b259c7e9c138e",
    measurementId: "G-0G14FRVTHL"

});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  
  // Customize notification here
  const notificationTitle = payload.notificationTitle;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

