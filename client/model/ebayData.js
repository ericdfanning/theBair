import $ from 'jquery';

const APP_ID = 'EricFann-ProfitPa-PRD-38e31710d-01603b3b';

export const getData = function(cb) {

  $.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:8000/getStuff',
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
    url: 'http://127.0.0.1:8000/gather',
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

// // TOKEN 

// // AgAAAA**AQAAAA**aAAAAA**7JWdWQ**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj
// 6ABloaoDZWBpwudj6x9nY+seQ**b90DAA**AAMAAA**HUb53oJEmEXDsGH48Dxkp
// yJeuc0IGUz7lTEXxpMsV7w12SQLA2Rmytq4eMwuFECCZShy0ajLjxiLfGwS4LYYK
// TSAcOvjwFMaPITqCyV8wmJb9ShYtuXL5C/1/qpvHosQmSBhCc7Sc1WMiyOoNqLP1
// ZAOR9bGKoEC1xeCiMvOH1WzNGhZm1WLNuUJaSrJpzWbGF+sjJPfPsAQgsOrI8XkY
// VPYh5aasEzOt+5JQ9afO/JxyUtqaIyVD3pTykaaBqM0uNOXIf8+/TaJSmrKCF2eE
// tHG+sF6je9BMT7HRpJJdumRXJMSfxvms5kb8Sx+nwZvOJfxR1yuX4zLnacdLGSRt
// EMRjELEcYMF5yJ6mzxavucsnpjt+fsnQn1Q3QHHbsJ9loI0Pbyx6RYo/H7QK6qQZ
// 9YGQIJvrxcYHpOG4CB0gIhe+z/aHn36mXYBmppo77VfyWCeTuSR4B/PclFJA4H0f
// DEf7cnQGydGKBDqwchYeNvrG4fTT5pJh4zKlrxVVNYtFn+VA2sIHcUezdBAr6Klf
// VBFogAinA9wemrm0CIkBfPMb0sgsA7A5I1nuLCketwdL5jd1ZLLHSaRcKJKhD2lp
// fWzJter1+3Oy82up4sWbvZnyOm9J5g9yK4nXXWJy72JjgCPvs+ghzUSAt4+HjSrp
// t0cO8YxjA70fRBq8B5wEwzOO4SGbEWLg69sTdmCGDq7qb/Pqv+0CU9zEux4hpQcE
// 1AaSvawQhkyL/LtCHVYaElXOMDe035GNQKJvx0a+Wr+





