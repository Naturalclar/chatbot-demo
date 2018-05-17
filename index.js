const functions = require('firebase-functions');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const responseJson = {};
  response.json(responseJson);
});
