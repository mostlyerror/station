const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on ${port}`))