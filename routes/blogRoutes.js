const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Delete Post
router.delete('/:id', blogController.blog_delete);

// Edit Post
router.put('/:id', blogController.blog_edit);

router.get('/', blogController.blog_index);

// Create Post
router.post('/', blogController.blog_create_post);

router.get('/create', blogController.blog_create);

router.get('/:id', blogController.blog_details);

module.exports = router;
