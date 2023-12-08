const mongoose = require('mongoose');
const Schema = mongoose.Schema

const todoSchema = new Schema({
    todo:{
        type:String,
        required: true,  
    },
    priority:{
        type:String,
        required: true
    },
    status:{
        type: Number,
    },
    user_id: {
        type:String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Todo", todoSchema);    