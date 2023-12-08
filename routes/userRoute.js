const express = require("express")
const router = express.Router()
const {signup, login, tokenVerify} = require('../controllers/userController')

router.post("/signup", signup)
router.get('/:id/verify/:token', tokenVerify)
router.post("/login", login)


module.exports = router