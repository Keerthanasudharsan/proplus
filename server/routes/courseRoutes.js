const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');  // Import mongoose here
const router = express.Router();
const Course = require('../models/Course'); // Adjust the path as necessary

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Course creation route
router.post('/create', upload.fields([{ name: 'coverImage' }, { name: 'salesVideo' }]), async (req, res) => {
  try {
    const { title, description, duration, category, level } = req.body;
    const coverImage = req.files.coverImage ? req.files.coverImage[0].filename : null;
    const salesVideo = req.files.salesVideo ? req.files.salesVideo[0].filename : null;

    // Create a new course instance
    const newCourse = new Course({
      title,
      description,
      duration,
      category,
      level,
      coverImage,
      salesVideo,
    });

    // Save the course to the database
    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully!', courseId: newCourse._id });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Return error message
  }
});

// Route to map chapters and topics to a course
router.post('/:courseId/add-content', async (req, res) => {
  const { courseId } = req.params;
  const { chapters } = req.body;

  // Validate courseId format
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid courseId format." });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Append chapters to the course
    course.chapters.push(...chapters);
    await course.save();

    res.json({ message: 'Course content saved successfully!' });
  } catch (error) {
    console.error('Error saving course content:', error);
    res.status(500).json({ message: 'Failed to save course content.' });
  }
});
module.exports = router;
