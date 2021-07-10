const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const handlebars = require("express-handlebars");
const {
  formatDate,
  truncate,
  stripTags,
  editIcon,
  select,
} = require("./helpers/hbs");

// Load config
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 3000;

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
process.env.NODE_ENV === "development" && app.use(morgan("dev"));

// View engine (handlebars)
app.engine(
  ".hbs",
  handlebars({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: { formatDate, truncate, stripTags, editIcon, select },
  })
);
app.set("view engine", ".hbs");

// session initialize
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      // mongooseConnection: mongoose.connection,
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/newStories"));

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
