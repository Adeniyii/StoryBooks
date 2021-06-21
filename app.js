const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const connectDB = require('./config/db');

// Load config
dotenv.config({path: './config/config.env'})
const PORT = process.env.PORT || 3000;

connectDB()

const app = express();

// Logging
process.env.NODE_ENV === "development" && app.use(morgan('dev'))

app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use('/', require('./routes/index'))

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
