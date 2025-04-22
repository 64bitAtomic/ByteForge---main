const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  _id: String, // Custom ID (e.g., "python", "java")
  name: String,
  topics: [
    {
      title: String,
      urlToMarkdown: String,
    },
  ],
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
