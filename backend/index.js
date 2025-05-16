const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")
const cors = require("cors")
const connection = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const questionRoutes = require("./routes/questionRoutes")
const { generateInterviewQuestions, generateConceptExplainations } = require("./controllers/aiController")
const protect = require("./middlewares/authMiddleware")

//middlewares
app.use(express.json())
app.use(cors())


//routes
app.use("/api/auth",authRoutes)
app.use("/api/sessions",sessionRoutes)
app.use("/api/questions",questionRoutes)
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions)
app.use("/api/ai/generate-explanation", protect, generateConceptExplainations)



//server file upload
app.use("/uploads", express.static(path.join(__dirname,"uploads"),{}))




app.listen(process.env.port,async()=>{
    connection()
    console.log(`server running on port:${process.env.port}`)
})