const sheets = require('./src/sheets');
const moment = require('moment');
require('moment-timezone');

const input = [
  'John',
  'Smith',
  'Very Good',
  moment().tz('America/Los_Angeles').format(),
];

sheets.start(input);
