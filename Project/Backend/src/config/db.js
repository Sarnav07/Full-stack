import admin from "firebase-admin";
import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(
    await readFile(new URL("../../firebase-key.json",import.meta.url))
);

export const connectDB= () => {
    try {
        admin.initializeApp({
            credential:admin.credential.cert(serviceAccount),
        });
        console.log("firebase connected successfully!");
        return admin.firestore();
    }
    catch (error) {
        console.error("firebase is not able to connect",error);
        process.exit(1);
    }
};

export const db = admin.apps.length ? admin.firestore() : connectDB();