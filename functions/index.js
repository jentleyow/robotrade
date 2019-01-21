const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("usersinfo")
    .doc("MYe6hluLCCFfIotqhe8N")
    .get()
    .then(doc => {
      if (doc.exists) {
        const totalUsers = doc.data().totalUsers + 1;
        admin
          .firestore()
          .collection("usersinfo")
          .doc("MYe6hluLCCFfIotqhe8N")
          .set({
            totalUsers: totalUsers
          });
      }
    });
});

//payment

const express = require("express");
const config = require("./config");
const stripe = require("stripe")(config.STRIPE_PRIVATE_KEY);
const app = express();
let bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/charge", (req, res) => {
  const { id, amount, finalAmount, email, uid } = req.body;
  if (id && amount && finalAmount && uid && email) {
    try {
      stripe.charges
        .create({
          amount: finalAmount * 100,
          currency: "sgd",
          description: "Email: " + email,
          source: id
        })
        .then(result => {
          return admin
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("payments")
            .doc(id)
            .set({
              amount: amount,
              approve: false,
              date: admin.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
              admin
                .firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then(snapshot => {
                  let data = snapshot.data();
                  let totalAmount = 0;
                  if (data.amount) {
                    totalAmount = data.amount;
                  }
                  admin
                    .firestore()
                    .collection("users")
                    .doc(uid)
                    .update({ amount: totalAmount + amount })
                    .then(() => {
                      res.status(200).end();
                    });
                });
            })
            .catch(err => {
              res.status(500).end();
            });
        })
        .catch(() => {
          res.status(500).end();
        });
    } catch (err) {
      res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
});

app.get("/charge", (req, res) => {});
exports.stripe = functions.https.onRequest(app);
