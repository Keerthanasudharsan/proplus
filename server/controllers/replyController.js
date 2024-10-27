// controllers/replyController.js
const Reply = require('../models/Reply');

exports.createReply = async (req, res) => {
    const { commentId, content } = req.body;
    try {
        const newReply = new Reply({
            commentId,
            userId: req.user._id,
            content,
        });
        await newReply.save();
        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ message: 'Error creating reply', error });
    }
};

exports.likeReply = async (req, res) => {
    const { replyId } = req.params;
    const userId = req.user._id;

    try {
        const reply = await Reply.findById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        if (reply.likes.includes(userId)) {
            // Unlike reply
            reply.likes = reply.likes.filter(id => id.toString() !== userId.toString());
        } else {
            // Like reply
            reply.likes.push(userId);
        }
        await reply.save();
        res.status(200).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Error liking reply', error });
    }
};
