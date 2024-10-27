// src/controllers/forumController.js
const Post = require('../models/ForumPost');
const Comment = require('../models/Comment');

// Create a new forum post
const createPost = async (req, res) => {
    const { title, content, courseId } = req.body; // Assuming you are sending title, content, and courseId

    if (!title || !content || !courseId) {
        return res.status(400).json({ error: 'Title, content, and course ID are required' });
    }

    try {
        const newPost = new Post({ title, content, courseId });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Unable to create post, please try again later.' });
    }
};

// Get all posts for a course
const getPosts = async (req, res) => {
    const { courseId } = req.params;

    try {
        const posts = await Post.find({ courseId }); // Fetch posts by courseId
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Unable to fetch posts, please try again later.' });
    }
};

// Create a comment for a post
const createComment = async (req, res) => {
    const { postId } = req.params; // Get postId from URL params
    const { content } = req.body; // Assuming you are sending the comment content

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const newComment = new Comment({ content, postId });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Unable to create comment, please try again later.' });
    }
};

// Get comments for a post
const getComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId }); // Fetch comments by postId
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Unable to fetch comments, please try again later.' });
    }
};

module.exports = {
    createPost,
    getPosts,
    createComment,
    getComments,
};
