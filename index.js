const config = require('dotenv').config()
const express = require('express')
const port = 1973

// const rp = require('request-promise')
// const exphbs = require('express-handlebars')

const app = express()

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
