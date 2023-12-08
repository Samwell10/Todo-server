const express = require("express")
const {postTodo, getTodo, deleteTodo} = require("../controllers/todoController")
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// require auth for all workout route
router.use(requireAuth)
//GET TODO
router.get("/todo", getTodo)

// POST TODO
router.post("/todo", postTodo)

// DELETE todo
router.delete("/todo/:id", deleteTodo)


module.exports = router;
