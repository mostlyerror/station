const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')



const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use((error, req, res, next) => {
  console.error(error)
  console.log(req.url)
  console.log(req.body)
  next(error)
})


app.use((req, res, next) => {
  console.log(req.url)
  console.log(req.body)
  next()
})

app.use('/users', require('./controllers/users'))
app.use('/books', require('./controllers/books'))
app.use('/billing', require('./controllers/billing'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on ${port}`))