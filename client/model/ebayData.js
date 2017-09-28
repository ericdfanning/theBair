import $ from 'jquery';

export const getData = function(cb) {
  console.log('production', process.env.NODE_ENV)
  // process.env.NODE_ENV === 'production' ? 'http://thebairdata.com/getstuff': 
  $.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:8000/getStuff',
    success: (data) => {
      console.log('back from the server inside of ebay ajax call success')
      cb(null, data)
    }, 
    error: (err) => {
      cb(err)
      console.log('FAILED', err)
    }
  })

}

export const gatherData = function(category, cb) { 
  console.log('production', process.env.NODE_ENV)
  // process.env.NODE_ENV === 'production' ? `http://thebairdata.com/${category}`: 
  $.ajax({
    method: 'GET',
    url: `http://127.0.0.1:8000/${category}`,
    success: (data) => {
      console.log('gathering data is done inside of ajax call success', data)
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





