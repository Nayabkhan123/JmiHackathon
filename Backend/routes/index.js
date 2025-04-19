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
module.exports = router