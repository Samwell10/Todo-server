const Todo = require('../models/todoModel')
const mongoose = require('mongoose')
// to get user todo
const getTodo = async(req, res)=>{

    const user_id = req.user._id
    const Todos = await Todo.find({user_id}).sort({createdAt:-1})
    res.status(200).json(Todos)
}


//to post todo
const postTodo = async(req, res)=>{
    const {todo, priority, status} = req.body;
    try{
        const user_id = req.user._id
        const Task = await Todo.create({todo, priority, status:1, user_id})
        res.status(200).json(Task)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//to delete todo
const deleteTodo = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Todo"})
    }
    const todo = await Todo.findOneAndDelete({_id:id})
    if(!todo){
        return res.status(404).json({error: "No Such Todo"})
    }
    res.status(200).json(todo)
}




module.exports = {
    getTodo,
    postTodo,
    deleteTodo
}