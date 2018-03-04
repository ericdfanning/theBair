const CronJob = require('cron').CronJob;
const Category = require('./schema').Category;
const { gettersHousing } = require('./server/makeInitialAPICall')
const express = require('express');
const app = express();

(function() {
  // **** This will run to find any stored category results that are older than 2 weeks and remove it
  const scan = () => {
    let today = new Date();
    console.log('CRON JOB RAN AT ', today.toString(), '**************')

    gettersHousing()

    Category.find({})
      .exec((err, catCalls) => {
        if (err) console.error(`ERROR: ${err}`);
        else if (!catCalls) console.log(`Could not retrieve catCalls`);
        else {
          console.log('Category length is', catCalls.length, 'oldest one ', catCalls[0].created.getDate())
          for (let catCall of catCalls) {

            let today = new Date();
            var compared = today.getDate()

            if(today.getDate() <= catCall.created.getDate()) {
              compared = today.getDate() + 31
            }

            if ((compared - catCall.created.getDate()) >= 14) {
              catCall.remove(function(err) {
                if (err) {
                  return console.log(err);
                }

                console.log('Category Object Deleted --- ', catCall.created, 'getDate() format', catCall.created.getDate());
              });
            }
          }
        }
      });
  }

  // this will run 7 days a week at 2 AM PST
  // if the server ever dies, it will simply restart with the server,
  // so at most one day will be lost, and any capsules that should have been
  // unearthed will simply be unearthed on the next day
  let job = new CronJob({
    cronTime: '00 00 03 1-31 1-12 0-6',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();

