// models/Topic.js
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: String,
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  description: String,
  content: String,

});

module.exports = mongoose.model('Topic', topicSchema);