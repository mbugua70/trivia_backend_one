const questionsModel = require("../models/quizData");

const mongoose = require("mongoose");



// workOut all
module.exports.question_get_all = async (req, res) => {


  try {
    const allQuestions = await questionsModel.aggregate([
      {
        $sample: { size: 10 },
      },
    ]);
    console.log(allQuestions);
    if (allQuestions.length === 0) {
      return res
        .status(200)
        .json({ success: true, msg: "You have no questions   available" });
    }
    return res.status(200).json({ success: true, allQuestions });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
