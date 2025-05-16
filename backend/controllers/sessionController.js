const Session = require("../models/Session")
const Question = require("../models/Question")


//create a new session and linked questions
const createSession = async(req,res)=>{
    try {
        const {role, experience, topicsToFocus, description, questions} = req.body
        const userId = req.user._id

        const session = await Session.create({
            user:userId, role, experience, topicsToFocus, description
        })

        const questionDocs = await Promise.all(
            questions?.map(async(q)=>{
            const question = await Question.create({
                session:session._id,
                question: q.question,
                answer: q.answer
            })
            return question._id
            })
        )
        session.questions = questionDocs
        await session.save()

        res.status(200).send({success:true, session})
    } catch (error) {
         res.status(400).send({message:"Server error", error:error.message})
    }
}



//get all sessions for a logged in user
const getMySessions = async(req,res)=>{
    try {
        const sessions = await Session.find({user:req.user.id}).sort({createdAt: -1}).populate("questions")
        res.status(200).send(sessions)
    } catch (error) {
         res.status(400).send({message:"Server error", error:error.message, success:false})
    }
}




//get a session by id with populated questions
const getSessionById = async(req,res)=>{
    try {
         const session = await Session.findById(req.params.id).populate({
            path: "questions",
            options: {sort: {isPinned: -1, createdAt: 1}}
         }).exec()

         if(!session){
            return res.status(400).send({success:false, message:"Session not found"})
         }

         res.status(200).send({success:true, session})
    } catch (error) {
         res.status(400).send({message:"Server error", error:error.message})
    }
}



//delete a session and its questions
const DeleteSession = async(req,res)=>{
    try {
        const session = await Session.findById(req.params.id)
       if(!session){
            return res.status(400).send({success:false, message:"Session not found"})
         }

         //checking if logged in user owns this session
         //console.log(session.user.toString())
         if(session.user.toString() !== req.user.id){
           res.status(400).send({message:"You are not authorized"})
         }

         //first deleting all questions related to session
         await Question.deleteMany({session: session._id})

         //next, deleting whole session
         await session.deleteOne()

        res.status(200).send({message:"Session deleted successfully"})

    } catch (error) {
         res.status(400).send({message:"Server error", error:error.message})
    }
}


module.exports = {createSession, DeleteSession, getMySessions, getSessionById}