import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential({
            projectId:process.env.FIREBASE_PROJECT_ID,
            clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
            privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
    });
};

export {admin};