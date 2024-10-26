const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
});

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topics: [topicSchema],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  duration: { type: String }, // Consider changing to Number if it fits your use case
  category: { type: String, default: '' },
  level: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  salesVideo: { type: String, default: '' },
  chapters: [chapterSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Optional: Add indexes for performance
courseSchema.index({ title: 1, category: 1 });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
