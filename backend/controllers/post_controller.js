import { PostService } from '../services/post_service';

class PostController {

    constructor() {
        this.postService = new PostService();
    }

    async isPermitted(req, res) {
        // If is an admin, then permit
        

        if (!await this.postService.isPostOwner()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await this.postService.getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPostById(req, res) {
        try {
            const post = await this.postService.getPostById(req.params.postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }

    async createPost(req, res) {
        try {
            const newPost = await this.postService.createPost(req.params.restaurantId, req.params.userId, req.body.comment, req.body.Id_Post_Parent);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatePost(req, res) {
        try {
            const updatedPost = await this.postService.updatePost(req.params.postId, req.params.restaurantId, req.comment);
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletePost(req, res) {
        if (!await this.postService.isPostOwner()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const deletedPost = await this.postService.deletePost(req.params.postId, req.params.restaurantId);
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async upvotePost(req, res) {
        try {
            const updatedPost = await this.postService.upvotePost(req.params.postId, req.params.restaurantId);
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async downvotePost(req, res) {
        try {
            const updatedPost = await this.postService.downvotePost(req.params.postId, req.params.restaurantId);
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReplies(req, res) {
        try {
            const replies = await this.postService.getReplies(req.params.postId, req.params.restaurantId);
            res.status(200).json(replies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPostsByUserId(req, res) {
        try {
            const posts = await this.postService.getPostsByUserId(req.params.id);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPostsByRestaurantId(req, res) {
        try {
            const posts = await this.postService.getPostsByRestaurantId(req.params.restaurantId);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = PostController;