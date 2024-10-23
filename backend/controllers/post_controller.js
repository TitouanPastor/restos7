import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    upvotePost,
    downvotePost,
    getReplies,
    getPostsByUserId,
    getPostsByRestaurantId,
    isPostOwner
} from '../services/post_service.js'; // Importation des méthodes du service

// Middleware to check permissions
export const isPermitted = async (req, res, next) => {
    // Check if user is admin (if needed)
    // Assume there's a function isAdmin() to check this
    if (req.user?.isAdmin) return next();

    // Check if user is the post owner
    const postId = req.params.postId;
    const userId = req.user?.id; // Assumed from authentication middleware
    const restaurantId = req.params.restaurantId;

    if (!await isPostOwner(postId, userId, restaurantId)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// Get all posts
export const getAllPostsHandler = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get post by ID
export const getPostByIdHandler = async (req, res) => {
    try {
        const post = await getPostById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new post
export const createPostHandler = async (req, res) => {
    try {
        const newPost = await createPost(req.params.restaurantId, req.params.userId, req.body.comment, req.body.Id_Post_Parent);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a post
export const updatePostHandler = async (req, res) => {
    try {
        const updatedPost = await updatePost(req.params.postId, req.params.restaurantId, req.body.comment);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a post
export const deletePostHandler = async (req, res) => {
    try {
        const deletedPost = await deletePost(req.params.postId, req.params.restaurantId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upvote a post
export const upvotePostHandler = async (req, res) => {
    try {
        const updatedPost = await upvotePost(req.params.postId, req.params.restaurantId);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Downvote a post
export const downvotePostHandler = async (req, res) => {
    try {
        const updatedPost = await downvotePost(req.params.postId, req.params.restaurantId);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get replies to a post
export const getRepliesHandler = async (req, res) => {
    try {
        const replies = await getReplies(req.params.postId, req.params.restaurantId);
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get posts by user ID
export const getPostsByUserIdHandler = async (req, res) => {
    try {
        const posts = await getPostsByUserId(req.params.id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get posts by restaurant ID
export const getPostsByRestaurantIdHandler = async (req, res) => {
    try {
        const posts = await getPostsByRestaurantId(req.params.restaurantId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
