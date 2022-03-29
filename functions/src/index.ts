import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const deleteAuth = functions
    .region("europe-west3").firestore
    .document("user/{uid}")
    .onDelete(async (snapshot) => {
      admin.auth().deleteUser(snapshot.id);
    });
