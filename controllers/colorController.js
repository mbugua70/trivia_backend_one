const colorsAnswerModel = require("../models/colorsAnswers");

const mongoose = require("mongoose");

module.exports.colors_get_all = async (req, res) => {
  try {
    const colorsData = await colorsAnswerModel.find({});
    console.log(colorsData);
    if (colorsData.length === 0) {
      return res
        .status(200)
        .json({ success: true, msg: "You have no colors   available" });
    }
    return res.status(200).json({ success: true, colorsData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
