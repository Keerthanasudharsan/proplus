const Course = require('../models/Course');
const Chapter = require('../models/Chapter');

// Create a new chapter for a course
exports.createChapter = async (req, res) => {
  const { title, description } = req.body;
  const { courseId } = req.params;

  try {
    // Validate course existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a new chapter
    const chapter = new Chapter({
      title,
      description,
      courseId,
    });

    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chapter', error: error.message });
  }
};

// Add topics to a chapter
exports.addTopicToChapter = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { title, description, content, attachments } = req.body;

  try {
    // Find the chapter by ID
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Create a new topic object
    const newTopic = {
      title,
      description,
      content,
      attachments,
    };

    // Push the new topic to the chapter's topics array
    chapter.topics.push(newTopic);

    // Save the updated chapter
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error adding topic', error: error.message });
  }
};

// Get all chapters for a specific course
exports.getChaptersByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find chapters by course ID
    const chapters = await Chapter.find({ courseId });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chapters', error: error.message });
  }
};

// Update a chapter
exports.updateChapter = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { title, description } = req.body;

  try {
    // Find the chapter by ID
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Update chapter fields
    chapter.title = title || chapter.title;
    chapter.description = description || chapter.description;

    // Save the updated chapter
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating chapter', error: error.message });
  }
};

// Delete a chapter
exports.deleteChapter = async (req, res) => {
  const { courseId, chapterId } = req.params;

  try {
    // Find and delete the chapter
    const chapter = await Chapter.findByIdAndDelete(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.status(200).json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chapter', error: error.message });
  }
};