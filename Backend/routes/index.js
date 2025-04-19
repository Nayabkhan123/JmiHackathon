const express = require('express')
const router = express.Router()

const registerController = require('../controllers/register')
const userLoginController = require('../controllers/login')
const currentUserDetail = require('../controllers/currentUserDetail')
const authToken = require('../middlewares/auth')
const userLogoutController = require('../controllers/logout')
const searchAlumni = require('../controllers/searchAlumni')


router.post('/register',registerController)
router.post('/login',userLoginController)
router.get('/user-details',authToken,currentUserDetail)
router.get('/logout',userLogoutController)
router.post('/search-alumini',searchAlumni)


router.get('/all-posts', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});


router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    const saved = await newPost.save();
    res.status(201).json(saved);
});
  


router.put('/:id', async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = router