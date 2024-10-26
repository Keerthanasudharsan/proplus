const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration, category, level } = req.body;
    const coverImage = req.file?.path; // Assuming single file upload
    const salesVideo = req.body.salesVideo; // Assuming salesVideo is a URL or path

    // Validate required fields
    if (!title || !duration) {
      return res.status(400).json({ success: false, message: 'Title and duration are required.' });
    }

    const course = new Course({
      title,
      description,
      duration,
      category,
      level,
      coverImage,
      salesVideo,
      createdBy: req.user._id,
    });

    await course.save();
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    console.error('Error creating course:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

// New function to add chapters and topics to an existing course
exports.addCourseContent = async (req, res) => {
  const { courseId } = req.params; // Get courseId from request parameters
  const { chapters } = req.body; // Get chapters from request body

  // Validate chapters input
  if (!Array.isArray(chapters) || chapters.length === 0) {
    return res.status(400).json({ success: false, message: 'Chapters should be a non-empty array.' });
  }

  try {
    const course = await Course.findById(courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    // Add each chapter to the course
    chapters.forEach(chapter => {
      // Validate chapter structure
      if (!chapter.title || !Array.isArray(chapter.topics)) {
        return res.status(400).json({ success: false, message: 'Each chapter must have a title and a non-empty topics array.' });
      }

      // Create a new chapter object
      const newChapter = {
        title: chapter.title,
        topics: chapter.topics.map(topic => ({
          title: topic.title,
          description: topic.description,
          content: topic.content,
          files: topic.files || [], // Ensure files is an array, default to empty if not provided
        })),
      };
      course.chapters.push(newChapter);
    });

    await course.save(); // Save the updated course with new chapters
    res.status(200).json({ success: true, message: 'Course content saved successfully!', data: course });
  } catch (error) {
    console.error('Error adding course content:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Failed to save course content.', error: error.message });
  }
};