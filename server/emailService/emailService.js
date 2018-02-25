const mailer = require('nodemailer');
const serviceEmailAddress = 'thebairdata@gmail.com';
const password = require('./email.config.js').password;
const rolesEmail = require('./email.config.js').email;
const adminEmail = require('./email.config.js').emailAdmin;
const template = require('./emailTemplate.js');
const path = require('path')
let bearImage = path.join(__dirname, '../../images/grizzly-bear-roaring.png')
var allCategoriesCache = require('../../cache/allCategoriesCache.js');

let transport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: serviceEmailAddress,
    pass: password
  }
});

let mailOptions = {
  from: serviceEmailAddress,
  subject: 'Here\'s your weekly rundown from The Bair!',
};

exports.sendEmail = (errorEmail) => {

  if (!errorEmail) {
    var dataObj = {
      dresses: allCategoriesCache.dresses.brands[0][0],
      tshirts: allCategoriesCache.womensTshirts.brands[0][0],
      topsAndBlouses: allCategoriesCache.topsAndBlouses.brands[0][0],
      flats: allCategoriesCache.flats.brands[0][0],
      sweaters: allCategoriesCache.womensSweaters.brands[0][0],
      jeans: allCategoriesCache.womensJeans.brands[0][0]
    }
  } 

  let options = {
    from: mailOptions.from,
    subject: mailOptions.subject, //errorEmail ? 'there was an error saving to cache for the bair': 
    to: rolesEmail,
    html: template(dataObj), //errorEmail ? `<div>Error saving ${errorEmail}</div>`: 
    attachments: [{
      filename: 'thebair.png',
      path: bearImage,
      cid: 'grizzly'
    }]
  }

  console.log('**************** EMAIL WAS CALLED ****************************')

  transport.sendMail(options, (err, info) => {
    if (err) {
      console.log(`ERROR sending email: ${err}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}