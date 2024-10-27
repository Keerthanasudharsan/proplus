// controllers/commentController.js
const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    const { postId, content } = req.body;
    try {
        const newComment = new Comment({
            postId,
            userId: req.user._id,
            content,
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
};

exports.getCommentsByPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.find({ postId }).populate('userId', 'name');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

exports.likeComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.likes.includes(userId)) {
            // Unlike comment
            comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
        } else {
            // Like comment
            comment.likes.push(userId);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error liking comment', error });
    }
};
