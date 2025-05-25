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
      type: [Number, "Please enter the correct phone Number"],
      required: [true, "Please insert phone number"],
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

userSchema.statics.SignUp = async function (name, phone, score, questionscore) {
  // validation
  if (!name || !phone) {
    throw Error("All fields must be filled");
  }

  const userPhone = await this.findOne({ phone });

  if (userPhone) {
    throw Error("You have already played");
  }

  const user = await this.create({ name, phone, score, questionscore });

  return user;
};

const UserModel = mongoose.model("Player", userSchema);
module.exports = UserModel;
