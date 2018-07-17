// https://blog.risingstack.com/node-hero-node-js-request-module-tutorial/
// https://github.com/request/request
// https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

// Libraries
const config = require('dotenv').config('../.env'); // For API key .env
const request = require('request-promise')
const parseXML = require('xml2js').parseString // bustime result come back in XML, we want json

// Globals
const BUSTIME_URL = 'http://realtime.ridemcts.com/bustime/api/v1/gettime'
const BUSTIME_API_KEY = process.env.BUSTIME_API_KEY // Get unique key and store it in .env

// Format and options for the request
var request_options = {
  method: 'GET',
  uri: BUSTIME_URL,
  qs: {
    key: BUSTIME_API_KEY
  },
  headers: {
    'cache-control': 'no-cache'
  },
  json: false // the response comes back as xml not json, see below
}

// Make the request and process it
request( request_options )
  .then(function (response) {  // Request was successful
    parseXML(response, function (err, result) { // from xml2js
      var json_result = result['bustime-response']['tm']
      // console.log( json_result );
      return json_result
    })
  })
  .catch(function (err) {
    console.log( err ) // Something bad happened, handle the error
  })
