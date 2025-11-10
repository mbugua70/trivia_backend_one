const mongoose = require("mongoose");
const { isEmail } = require("validator");
const validator = require("validator");
const Schema = mongoose.Schema;



// Defining out Schema structure.

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert  name"],
    },
    phone: {
      type: Number,
      required: [true, "Please insert phone number"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please insert email"],
      unique: true,
    },
    score: {
      type: String,
    },
    questionscore: {
      type: [],
    }
  },
  { timestamps: true }
);

userSchema.statics.SignUp = async function (name, phone, email, score, questionscore) {
  // validation
  if (!name || !phone || !email) {
    throw Error("All fields must be filled");
  }

  const userPhone = await this.findOne({ phone });

  if (userPhone) {
    throw Error("You have already played");
  }

  const user = await this.create({ name, phone,email, score, questionscore });
  console.log(user, "user login 1");
  return user;
};

const UserModel = mongoose.model("Player", userSchema);
module.exports = UserModel;
