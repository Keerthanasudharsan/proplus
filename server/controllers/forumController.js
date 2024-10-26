const Forum = require('../models/Forum'); // Import the Forum model
const Course = require('../models/Course'); // Import the Course model
const User = require('../models/User'); // Import the User model

// Create a new forum post
exports.createForumPost = async (req, res) => {
  const { courseId } = req.params;
  const { title, content } = req.body;

  try {
    // Validate course existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a new forum post
    const forumPost = new Forum({
      courseId,
      title,
      content,
      createdBy: req.user._id, // Assuming req.user is set by the auth middleware
    });

    await forumPost.save();
    res.status(201).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating forum post', error: error.message });
  }
};

// Get all forum posts for a specific course
exports.getForumPostsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find forum posts by course ID
    const forumPosts = await Forum.find({ courseId }).populate('createdBy', 'username'); // Populate user info
    res.status(200).json(forumPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving forum posts', error: error.message });
  }
};

// Add a comment to a forum post
exports.addCommentToForumPost = async (req, res) => {
  const { courseId, postId } = req.params;
  const { comment } = req.body;

  try {
    // Find the forum post by ID
    const forumPost = await Forum.findById(postId);
    if (!forumPost) {
      return res.status(404).json({ message: 'Forum post not found' });
    }

    // Create a new comment object
    const newComment = {
      user: req.user._id, // Assuming req.user is set by the auth middleware
      comment,
    };

    // Push the new comment to the forum post's comments array
    forumPost.comments.push(newComment);

    // Save the updated forum post
    await forumPost.save();
    res.status(201).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

// Delete a forum post
exports.deleteForumPost = async (req, res) => {
  const { postId } = req.params;

  try {
    // Find and delete the forum post
    const forumPost = await Forum.findByIdAndDelete(postId);
    if (!forumPost) {
      return res.status(404).json({ message: 'Forum post not found' });
    }

    res.status(200).json({ message: 'Forum post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting forum post', error: error.message });
  }
};
