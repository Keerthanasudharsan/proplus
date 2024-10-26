// models/chapterModel.js

const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },

});

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic',required: true }]
});

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;
