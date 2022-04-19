import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const fcm = admin.messaging();
const db = admin.firestore();

export const deleteAuth = functions
    .region("europe-west3").firestore
    .document("user/{uid}")
    .onDelete(async (snapshot) => {
      admin.auth().deleteUser(snapshot.id);
    });

export const sendNotification = functions
    .region("europe-west3").firestore
    .document("rosters/{rosterId}/{uid}/times")
    .onUpdate(async (snapshot, context) => {
      functions.logger.log("snapshot:", snapshot);
      functions.logger.log("context:", context);

      const querySnapshot = await db
          .collection("user")
          .doc(context.params.uid)
          .collection("tokens")
          .get();

      const tokens = querySnapshot.docs.map((snap) => snap.id);

      const payload: admin.messaging.MessagingPayload = {
        notification: {
          title: "Dienstplanänderungen!",
          body: "Neue Änderungen im Dienstplan die dich betreffen.",
          click_action: "FLUTTER_NOTIFICATION_CLICK",
        },
      };

      return fcm.sendToDevice(tokens, payload);
    });
