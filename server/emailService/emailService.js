const mailer = require('nodemailer');
const serviceEmailAddress = 'thebairdata@gmail.com';
const password = require('./email.config.js').password;
const rolesEmail = require('./email.config.js').email;
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

exports.sendEmail = (recipient, message) => {
  var dataObj = {
    dresses: allCategoriesCache.dresses.brands[0][0],
    tshirts: allCategoriesCache.tshirts.brands[0][0],
    topsAndBlouses: allCategoriesCache.topsAndBlouses.brands[0][0]
  }

  let options = {
    from: mailOptions.from,
    subject: mailOptions.subject,
    to: rolesEmail,
    html: template(dataObj),
    attachments: [{
      filename: 'thebair.png',
      path: bearImage,
      cid: 'grizzly'
    }]
  }

  transport.sendMail(options, (err, info) => {
    if (err) {
      console.log(`ERROR sending email: ${err}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}