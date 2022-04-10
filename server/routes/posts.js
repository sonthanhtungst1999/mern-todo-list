const express = require('express')
const router = express.Router()
const PostsController = require('../app/controllers/PostsController')



//Post router
router.get('/', PostsController.getPost)
router.post('/', PostsController.handleCreatePost)
router.put('/:id', PostsController.handleUpdatePost)
router.delete('/:id', PostsController.handeDeletePost)


module.exports = router