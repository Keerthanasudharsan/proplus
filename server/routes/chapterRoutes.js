const express = require('express');
const router = express.Router();
const {
  createChapter,
  addTopicToChapter,
  getChaptersByCourse,
  updateChapter,
  deleteChapter,
} = require('../controllers/chapterController');
const { protect } = require('../middlewares/authMiddleware');

// Create a new chapter for a course
router.post('/:courseId', protect, createChapter);

// Add topics to a chapter
router.post('/:courseId/:chapterId/topics', protect, addTopicToChapter);

// Get all chapters for a specific course
router.get('/:courseId', protect, getChaptersByCourse);

// Update a chapter
router.put('/:courseId/:chapterId', protect, updateChapter);

// Delete a chapter
router.delete('/:courseId/:chapterId', protect, deleteChapter);

module.exports = router;
