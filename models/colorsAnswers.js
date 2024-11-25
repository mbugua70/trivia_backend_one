const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Defining out Schema structure.

const colorsDataSchema = new Schema(
  {
    colors_answers: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const colorAnswerModel = mongoose.model("colors_answer", colorsDataSchema);
module.exports = colorAnswerModel;
