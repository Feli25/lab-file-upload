const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Post = require('../models/post')

function ensureAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.redirect('/auth/login')
  }
}

/* GET home page */
router.get('/', (req, res, next) => {
  Post.find().populate('_creatorId')
    // TODO: populate
    .then(posts => { res.render('index', { posts: posts }) })
});

router.get('/add-post', ensureAuthenticated, (req, res, next) => {
  res.render('add-post')
})

router.post('/add-post', ensureAuthenticated, (req, res, next) => {
  const content = req.body.content;
  const creatorId = req.user._id;
  const newPost = new Post({
    content: content,
    _creatorId: creatorId,
  })
  newPost.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/profile', ensureAuthenticated, (req, res, next) => {
  Post.find({ _creatorId: req.user._id })
    .then(posts => { res.render('profile', { user: req.user, posts: posts }) })
    .catch(err => { console.log(err) })
})

router.get('/post/:id/delete', ensureAuthenticated, (req, res, next) => {
  const id = req.params.id
  Post.findByIdAndRemove(id)
    .then(sth => { res.redirect('/profile') })
})

module.exports = router;
