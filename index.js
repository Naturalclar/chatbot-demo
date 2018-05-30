'use strict';

const {WebhookClient} = require('dialogflow-fulfillment');
const functions = require('firebase-functions');
const sheets = require('./src/sheets');

const fulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  /** @param {WebhookClient} agent */
  function welcome(agent) {
    agent.add('Starting Function');
    sheets.start();
  }

  /** @param {WebhookClient} agent */
  function fallback(agent) {
    agent.add(`I didn't get that`);
    agent.add(`I'm sorry, can you try again?`);
  }

  /**
   * Survey gets survey results and upload it onto sheets
   * @param {WebhookClient} agent
   */
  function survey(agent) {
    agent.add(`Thank you very much for input! 
    Your answer was ${agent.parameters.Rating}`);
    sheets.start();
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Survey Result', survey);
  agent.handleRequest(intentMap);
});

exports.dialogflowFirebaseFulfillment = fulfillment;
