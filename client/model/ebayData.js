import $ from 'jquery';

export const getData = function(cb) {

  $.ajax({
    method: 'GET',
    url: process.env.NODE_ENV === 'production' ? 'http://thebairdata.com/getstuff': 'http://127.0.0.1:8000/getStuff',
    success: (data) => {
      console.log('its done')
      cb(null, data)
    }, 
    error: (err) => {
      cb(err)
      console.log('FAILED', err)
    }
  })

}

export const gatherData = function(cb, category) {

  $.ajax({
    method: 'GET',
    url: process.env.NODE_ENV === 'production' ? 'http://thebairdata.com/gather': 'http://127.0.0.1:8000/gather',
    success: (data) => {
      console.log('its done')
      cb(null, data)
    }, 
    error: (err) => {
      cb(err)
      console.log('FAILED', err)
    }
  })

}

// startSpinner: function() {
//   $('.spinner img').show();
//   $('form input[type=submit]').attr('disabled', 'true');
// },

// stopSpinner: function() {
//   $('.spinner img').fadeOut('fast');
//   $('form input[type=submit]').attr('disabled', null);
// }





