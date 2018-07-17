// https://blog.risingstack.com/node-hero-node-js-request-module-tutorial/

// Libraries
const config = require('dotenv').config(); // For API key key.env
const request = require('request-promise')
const parseXML = require('xml2js').parseString

const BUSTIME_URL = 'http://realtime.ridemcts.com/bustime/api/v1/getroutes'
const BUSTIME_API_KEY = process.env.BUSTIME_API_KEY

// Start formatting the request
var request_options = {
  method: 'GET',
  uri: BUSTIME_URL,
  qs: {
    key: BUSTIME_API_KEY
  },
  headers: {
    'cache-control': 'no-cache'
  }
}

request( request_options )
  .then(function (response) {
    // Request was successful
    parseXML(response, function (err, result) {
      var my_result = result['bustime-response']['route']
      for (var route in my_result) {
        console.log(my_result[route]['rt']);
      }
    })
  })
  .catch(function (err) {
    // Something bad happened, handle the error
    console.log( err )
  })

// var url_site = "http://realtime.ridemcts.com"
// var url_api = "/bustime/api/v1/getroutes"
// var url_request = url_site + url_api

// request(request_options)
//   .then(function (response) {
//     // Request was successful, use the response object at will
//   })
//   .catch(function (err) {
//     // Something bad happened, handle the error
//   })
// querystring = {
// 	"key":os.environ['BUSTIME_API_KEY']
// }
// headers = {
// 	'cache-control': "no-cache"
// }
// request.get(url_request, { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body);
//   // console.log(res);
// });

// console.log( url_request );
