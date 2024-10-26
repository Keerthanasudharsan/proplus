const express = require('express');
const router = express.Router();
const {
  createForumPost,
  getForumPostsByCourse,
  addCommentToForumPost,
  deleteForumPost,
} = require('../controllers/forumController');
const { protect } = require('../middlewares/authMiddleware');

// Create a new forum post
router.post('/:courseId', protect, createForumPost);

// Get all forum posts for a specific course
router.get('/:courseId', protect, getForumPostsByCourse);

// Add a comment to a forum post
router.post('/:courseId/:postId/comments', protect, addCommentToForumPost);

// Delete a forum post
router.delete('/:postId', protect, deleteForumPost);

module.exports = router;
