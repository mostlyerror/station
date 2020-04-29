const express = require("express");
const bodyParser = require("body-parser");

const app = express();



app.use(bodyParser.json());

app.use('/books', require('./controllers/books'))
app.use('/users', require('./controllers/users'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on ${port}`))