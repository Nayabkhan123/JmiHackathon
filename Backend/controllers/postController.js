const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { title, content, authorName, authorPic, profession,postImage } = req.body;

        if (!title || !content || !authorName) {
            return res.status(400).json({
                success: false,
                message: "Title, content, and author name are required.",
            });
        }

        const newPost = new Post({
            title,
            content,
            authorName,
            authorPic,
            profession,
            postImage
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully.",
            post: savedPost,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create post.",
            error: err.message,
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json({
            success: true,
            posts,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch posts.",
            error: err.message,
        });
    }
};

const editPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, authorPic, profession,postImage } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                ...(title && { title }),
                ...(content && { content }),
                ...(authorPic && { authorPic }),
                ...(profession && { profession }),
                ...(postImage && { postImage }),
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully.",
            post: updatedPost,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update post.",
            error: err.message,
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully.",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete post.",
            error: err.message,
        });
    }
};



module.exports = {
    createPost,
    getAllPosts,
    editPost,
    deletePost,
};
