const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      validate: [isEmail],
    },
    password: {
      type: String,
      required: true,
      maxlength: 2048,
    },
    picture: {
      type: String,
      default: "random-user.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error("Email incorrect");
};

module.exports = mongoose.model("User", userSchema);
