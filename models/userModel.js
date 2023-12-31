const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        require:true,
        unique: true
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true,
    },
    verified:{
        type:Boolean,
        default:false
    },
})


// static signup method

userSchema.statics.signup = async function(email, username, password){

    if(!email || !username || !password){
        throw Error("All Field must be Filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Invalid Email")
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password is not Strong enough")
    }
 
    const exists = await this.findOne({email})
    const existsusername = await this.findOne({username})

    if (exists){
        throw Error("Email already in use")
    }
    if (existsusername){
        throw Error("Username already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, username, password: hash})

    return user

}

userSchema.statics.login = async function(email, password){
    if(!email  || !password){
        throw Error("All Field must be Filled")
    }
    const user = await this.findOne({email})

    if (!user){
        throw Error("Incorrect Email or Password")
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect Email or Password")
    }

    return user
} 


module.exports = mongoose.model("user" , userSchema)