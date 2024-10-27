const express = require('express');
const router = express.Router();
const ForumTopic = require('../models/Topic'); // Import your ForumTopic model

// Get topics for a course
router.get('/:courseId', async (req, res) => {
    console.log("fffffffffffffffffffff")
  console.log(`Received GET request for course ID: ${req.params.courseId}`); // Log the request

  try {
    const topics = await ForumTopic.find({ courseId: req.params.courseId });
    console.log(`Fetched topics: ${JSON.stringify(topics)}`); // Log the fetched topics
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error); // Log the error for debugging
    res.status(500).json({ message: 'Unable to fetch topics, please try again later.' });
  }
});

// Create a new topic for a course
router.post('/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;

  console.log(`Received POST request to create topic for course ID: ${courseId}`); // Log the request
  console.log(`Request body: ${JSON.stringify(req.body)}`); // Log the request body

  // Validate the request body
  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newTopic = new ForumTopic({ title, courseId });
    const savedTopic = await newTopic.save();
    console.log(`Created new topic: ${JSON.stringify(savedTopic)}`); // Log the newly created topic
    res.status(201).json(savedTopic);
  } catch (error) {
    console.error('Error creating topic:', error); // Log the error for debugging
    res.status(500).json({ message: 'Unable to create topic, please try again later.' });
  }
});

module.exports = router;
