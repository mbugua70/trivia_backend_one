const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Defining out Schema structure.

const quizDataSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    correct_answer: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const questionsModel = mongoose.model("sample_one_trivia", quizDataSchema);
module.exports = questionsModel;
