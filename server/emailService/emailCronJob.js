const CronJob = require('cron').CronJob;
var express = require('express');
var app = express();
let emailService = require('./emailService');
var allCategoriesCache = require('../../cache/allCategoriesCache.js');

(function() {

  const scan = () => {
    emailService.sendEmail()
  }

  // this will run once a week at 9 AM CST
  // if the server ever dies, it will simply restart with the server,
  // so at most one day will be lost, and an email won't be sent for the day
  let job = new CronJob({
    cronTime: '00 00 07 1-31 1-12 0-6',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();