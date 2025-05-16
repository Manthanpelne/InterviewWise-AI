const {GoogleGenAI} = require("@google/genai")
const {conceptExplainPrompt, questionAnswerPrompt} = require("../utils/prompts")

const ai = new GoogleGenAI({ apiKey: process.env.gemini_api_key})


const generateInterviewQuestions = async(req,res)=>{
    try {
        const {role, experience, topicsToFocus, numberOfQuestions} = req.body

        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).send({message:"Missing required fields"})
        }
    
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions)

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt
        })

        let rawText = response.text

        const cleanedText = rawText
        .replace(/^```json\s*/,"") //removing starting ```jSON
        .replace(/```$/,"") //removes ending
        .trim()

        const data = JSON.parse(cleanedText)

        res.status(200).send(data)

    } catch (error) {
        res.status(400).send({
            message:"Failed to generate questions",
            error:error.message
        })
    }
}



const generateConceptExplainations = async(req,res)=>{
    try {
        
        const {question} = req.body
        if(!question){
            return res.status(400).send({message:"Missing required fields"})
        }

          const prompt = conceptExplainPrompt(question)

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt
        })

        let rawText = response.text


        //cleantext removes ```json and ``` from beginning and end
        const cleanedText = rawText
        .replace(/^```json\s*/,"") //removing starting ```jSON
        .replace(/```$/,"") //removes ending
        .trim()

        //now safe to parse
        const data = JSON.parse(cleanedText)

        res.status(200).send(data)

    } catch (error) {
         res.status(400).send({
            message:"Failed to generate concept explaination",
            error:error.message
        })
    }
}


module.exports = {generateConceptExplainations, generateInterviewQuestions}