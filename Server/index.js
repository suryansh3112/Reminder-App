const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const userRoute = require('./routes/user.route')
app.use('', userRoute)

const eventRoute = require('./routes/event.route')
app.use('', eventRoute)


app.listen(PORT, () => console.log(`The Server has started on port ${PORT}.`));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB started.');
  })
  .catch((err) => {
    console.log(err);
  });
