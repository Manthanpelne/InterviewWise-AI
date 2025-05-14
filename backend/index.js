const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")
const cors = require("cors")
const connection = require("./config/db")

//middlewares
app.use(express.json())
app.use(cors())


//routes
// app.use("/api/auth",authRoutes)
// app.use("/api/sessions",sessionRoutes)
// app.use("/api/auth",questionRoutes)
// app.use("/api/auth",protect, generateInterviewQuestions)
// app.use("/api/auth",protect, generateConceptExplaination)



//server file upload
app.use("/uploads", express.static(path.join(__dirname,"uploads"),{}))




app.listen(process.env.port,async()=>{
    connection()
    console.log(`server running on port:${process.env.port}`)
})