const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//VERIFY USER AUTH
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
//ROUTES
app.use("/api", require("./routes/auth.routes"));

//APPLICATION
app.listen(process.env.PORT, () => {
  console.log(`Listening on port : ${process.env.PORT}`);
});
