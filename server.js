const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");

const app = express();

app.use(cors());

const users = require("./routes/api/users");

const PORT = process.env.PORT || 9000;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
// DB Config
const db = require("./config/creds").mongoURI;
// Connect to MongoDB using try/catch
try {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Successfully connected to MongoDB!");
} catch (err) {
  console.log(err.message);
}

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Portfolio generator API!!" });
});

app.listen(PORT, () => console.log(`Server running on PORT:${PORT} 🎉`));
