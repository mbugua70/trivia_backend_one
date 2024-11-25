const questionsModel = require("../models/quizData");

const mongoose = require("mongoose");

// handling errors
// const  handleErrors = (err)=> {
//   let errors = {title: '', reps: '', load:''}
// }
// controllers functions

// workOut all
module.exports.question_get_all = async (req, res) => {
  // const user_id = req.user._id;
  // console.log(user_id);

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
