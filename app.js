const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const connectDB = require("./config/db");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

// Load config
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

// Logging
process.env.NODE_ENV === "development" && app.use(morgan("dev"));

require("./config/passport")(passport);

// View engine (handlebars)
app.engine(".hbs", handlebars({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// session initialize
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
