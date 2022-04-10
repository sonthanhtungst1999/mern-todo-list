require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000

const db = require('./config/database')
const Route = require('./routes')

//Connect MongoDB
db.connect()

//Read method Post
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

//CORS config
app.use(cors())

//Route init
Route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
