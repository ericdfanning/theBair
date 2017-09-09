const CronJob = require('cron').CronJob;
const Category = require('./schema').Category;

(function() {
  /*
    * This function is fed to the CRON job below, and will perform a scan
    * of the entire capsules table to find capsules whose unearthDates are
    * today or earlier.  It will mark these as unearthed and no longer buried,
    * and will send an email to the user at the provided email address, notifying
    * them of their unearthed capsule.
   */
  const scan = () => {
    Category.find({})
      .exec((err, capsules) => {
        if (err) console.error(`ERROR: ${err}`);
        else if (!capsules) console.log(`Could not retrieve capsules`);
        else {
console.log('CRON JOB RAN ************** ')
          for (let capsule of capsules) {
            let today = new Date();
            if (today >= capsule.created) {

            capsule.remove(function(err) {
              if (err) {
                return console.log(err);
              }
              let today = new Date();

              console.log('Category Object Deleted', today);
            });

            }
          }
        }
      });
  }

  // this will run 7 days a week at 8 AM PST
  // if the server ever dies, it will simply restart with the server,
  // so at most one day will be lost, and any capsules that should have been
  // unearthed will simply be unearthed on the next day
  let job = new CronJob({
    cronTime: '* * * * * *',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();

