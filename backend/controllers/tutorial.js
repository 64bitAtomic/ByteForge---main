const Tutorial = require("../models/tutorialModel");

// Get all tutorials by language
exports.getTutorialsByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    const tutorials = await Tutorial.findOne({ _id: language });
    return res.status(200).json({ success: true, tutorials });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
