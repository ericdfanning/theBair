const CronJob = require('cron').CronJob;
const express = require('express');
const app = express();
const emailService = require('./emailService');
let allCategoriesCache = require('../../cache/allCategoriesCache.js');

(function() {

  const scan = () => {
    emailService.sendEmail()
  }

  // this will run once a week on Sunday at 9 AM CST and send one email
  // if the server ever dies, it will simply restart with the server,
  // so at most one day will be lost, and an email won't be sent for the week
  let job = new CronJob({
    cronTime: '00 07 07 1-31 1-12 0',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();