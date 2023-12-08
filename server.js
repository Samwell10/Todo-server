require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const todoRoute = require("./routes/todoRoute")
const userRoute = require("./routes/userRoute")
const cors = require('cors')
const app = express()


app.use(cors({
    origin: ["http://localhost:3000"]
}))
app.use(express.json())

app.use((req, res,next)=>{
    console.log(req.path, req.method)
    next()
})
//routes
app.use('/api/todo', todoRoute)
app.use('/api/user', userRoute)


mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("LISTENING ON PORT 4000")
        })
    })
    .catch((err)=>{
        console.log(err)
    })