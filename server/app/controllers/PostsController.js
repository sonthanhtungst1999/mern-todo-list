const Post = require('../models/Post')

class PostsController {
  //@[GET] /api/post/
  //@access Private
  //@desc Get all posts
  async getPost(req, res) {
    try {
      const posts = await Post.find({ user: req.userId }).populate('user', [
        'username',
      ])
      res.json({ sucess: true, posts })
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error server ' + err })
    }
  }

  //@[POST] /api/post/
  //@access Private
  //@desc Create post
  async handleCreatePost(req, res) {
    const { title, description, url, status } = req.body

    //Simple validation
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: 'Title is required' })

    try {
      //Create new post
      const newPost = new Post({
        title,
        description,
        url: url.startsWith('https://') ? url : `https://${url}`,
        status,
        user: req.userId,
      })
      await newPost.save()
      res.json({ success: true, message: 'Happy learning <3', post: newPost })
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error server ' + err })
    }
  }

  //@[PUT] /api/post/:id
  //@access Private
  //@desc Update many field post
  async handleUpdatePost(req, res) {
    const { title, description, url, status } = req.body
    try {
      let updatePost = {
        title,
        description: description || '',
        status,
        url:
          url === ''
            ? url
            : url.startsWith('https://')
            ? url
            : `https://${url}`,
      }

      //Handle update post
      const conditionUpdatePost = { _id: req.params.id, user: req.userId }
      updatePost = await Post.findOneAndUpdate(
        conditionUpdatePost,
        updatePost,
        { new: true }
      )
      if (!updatePost)
        return res
          .status(401)
          .json({
            success: false,
            message: 'Post not found or user not authorized',
          })

      //All good
      res.json({
        sucess: true,
        message: 'Update sucessfully',
        post: updatePost,
      })
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error server ' + err })
    }
  }

  //@[DELETE] /api/post/:id
  //@access Private
  //@desc delete one post
  async handeDeletePost(req, res) {
    const postId = req.params.id
    try {
      //Handle delete post
      const conditionDeletePost = { _id: postId, user: req.userId }
      const deletePost = await Post.findOneAndDelete(conditionDeletePost)
      if (!deletePost)
        return res
          .status(401)
          .json({
            success: false,
            message: 'Post not found or user not authorized',
          })

      //All good
      res.json({
        sucess: true,
        message: 'Delete successfully',
        post: deletePost,
      })
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error server ' + err })
    }
  }
}

module.exports = new PostsController()
