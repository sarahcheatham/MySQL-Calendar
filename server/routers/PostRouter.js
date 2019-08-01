const express = require('express')
const postsController = require('../controllers/PostController')
const router = express.Router()

router.get('/users/:id/posts', postsController.getAllUserPosts)

router.get('/users/:id/posts/:postId', postsController.getPostById)

router.post('/users/:id/posts', postsController.createPost)

router.put('/users/:id/posts/:postId', postsController.updatePostById)

router.delete('/users/:id/posts/:postId', postsController.deletePostById)

module.exports = router;