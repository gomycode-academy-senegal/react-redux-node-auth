const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//ROUTES
app.use("/api", require("./routes/auth.routes"));

//APPLICATION
app.listen(process.env.PORT, () => {
  console.log(`Listening on port : ${process.env.PORT}`);
});
