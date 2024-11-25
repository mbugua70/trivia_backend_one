const mongoose = require("mongoose");
const UserModel = require("../models/userLogin");
const jwt = require("jsonwebtoken");

// createToken method

const createToken = ({ _id }) => {
  // the first arguement is usually the payload
  // second arg is the secret string
  // third arg its an optional parameter
  return jwt.sign({ _id }, process.env.SECRET_STRING, { expiresIn: "3d" });
};


// handle error fun
// handle errors
const handleErrors = (err) => {
  console.log(err);

  let errors = { phone: "", name: "", validate: "", played: "" };

  if (err.message.includes("Please insert phone number")) {
    errors.phone = "Please insert phone number";
  }

  if (err.message.includes("Cast to Number failed for value")) {
    errors.phone = "Please insert correct phone number";
  }
  if (err.message.includes("All fields must be filled")) {
    errors.validate = "All fields must be filled ";
  }

  if (err.message.includes("You have already played")) {
    errors.played = "You have already played";
  }

  if (err.message.includes("Please insert  name")) {
    errors.name = "Please insert name";
  }



  return errors;
};

module.exports.signUpUser = async (req, res) => {
  const { name, phone, score } = req.body;

  try {
    const user = await UserModel.SignUp(name, phone, score);

    const userId = user._id;
    const token = createToken(user._id);
    res.status(200).json({ userId, token });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

module.exports.player_update = async (req, res) => {
  //   res.json({ msg: "Update workout" });

  try {
    const paramsID = req.params.id;
    const updatedValue = req.body;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ error: "The player does not exist" });
    }
    const updatedPlayer = await UserModel.findByIdAndUpdate(
      paramsID,
      updatedValue,
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ error: "No such player" });
    }

    res.status(200).json({ success: true, updatedPlayer });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};