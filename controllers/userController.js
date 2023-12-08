const User = require('../models/userModel') 
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const createToken =(_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}
const signup = async(req, res)=>{
    const {email, password, username} = req.body

    try{
        const user  = await User.signup(email, username, password)

        //create a token 
        const token = createToken(user._id)

        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token}`
        await sendEmail(user.email, "VERIFICATION EMAIL", url)
        res.status(200).json({email, username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
const tokenVerify = async(req, res)=>{
    const {id} = req.params
    try{
        const user = await User.findOne({_id: id})
        if(!user) return res.status(400).send({message:"Invalid Link"});

        await User.updateOne({_id: user._id, verified: true});
    }catch{
        res.status(400).json({error: error.message})
    }
}
const login= async(req, res)=>{
    const {email, password} = req.body
    
    try{
        const user  = await User.login(email,password)

        //create a token 
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
      
}


module.exports = {
    login,
    signup,
    tokenVerify
}