'use strict';

const {WebhookClient} = require('dialogflow-fulfillment');
const functions = require('firebase-functions');

const fulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  const responseJson = {};
  responseJson.fulfillmentMessages = [{
    text: `Hello World from ResponseJson!`,
  }];
  response.json(responseJson);

  /** @param {WebhookClient} agent */
  function welcome(agent) {
    agent.add('Hello World!');
  }

  /** @param {WebhookClient} agent */
  function fallback(agent) {
    agent.add(`I didn't get that`);
    agent.add(`I'm sorry, can you try again?`);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  agent.handleRequest(intentMap);
});

exports.dialogflowFirebaseFulfillment = fulfillment;
