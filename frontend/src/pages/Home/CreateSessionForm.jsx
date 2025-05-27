import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Inputs/Input";
import { LuBadgeAlert } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

export const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus || !description) {
      setError("Please fill all the required fields");
      return;
    }
    setError("");
    setIsLoading(true)

   try {
     //api call to generate questions
    const ai_Response = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
        role, 
        experience,
        topicsToFocus,
        numberOfQuestions : 10
    })
    
    //should be array like [{question, answer}, ...]
    const generateQuestions = ai_Response.data;
    
    const response = await axiosInstance.post(API_PATHS.SESSION.CREATE,{
        ...formData,
        questions : generateQuestions
    })

    if(response.data?.session?._id){
      navigate(`/interview-prep/${response.data?.session?._id}`)
    }
   } catch (error) {
     if(error.response && error.response.data.message){
        setError(error.response.data.message)
     }else{
        setError("Something went wrong. Please try again")
     }
   }
   finally{
    setIsLoading(false)
   }
   
};


  return (
    <div>
     <div className="w-[90%]">
      <h3 className="text-xl font-semibold">Start a New Interview Journey</h3>
      <p className="text-[#6c6a6a]">
        Craft your perfect answers and build confidence for any interview scenario.
      </p>
      </div>

      <form
        className="mt-7 flex flex-col gap-4"
        action=""
        onSubmit={handleCreateSession}
      >
        <div>
          <label htmlFor="role">Role</label>
          <Input
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            type="text"
            placeholder="(e.g., Frontend Developer, UI/UX Designer, etc..)"
          />
        </div>

         <div>
            <label htmlFor="Experience">Experience</label>
            <Input 
            value={formData.experience}
            onChange={({target})=> handleChange("experience", target.value)}
            type="number"
            placeholder="(e.g., 1, 3, 5+ etc..)"
            />
            </div>

             <div>
            <label htmlFor="topicsToFocus">Topics To Focus</label>
            <Input 
            value={formData.topicsToFocus}
            onChange={({target})=> handleChange("topicsToFocus", target.value)}
            type="text"
            placeholder="(Comma-seperated e.g., React, Java, JavaScript etc..)"
            />
            </div>

             <div>
            <label htmlFor="description">Description</label>
            <Input 
            value={formData.description}
            onChange={({target})=> handleChange("description", target.value)}
            type="text"
            placeholder="(Any specific goals or notes for this session)"
            />
            </div>

           
            {/* error handler */}
             {error && <p className='text-[#ff2222]  flex items-center gap-2'><LuBadgeAlert /> {error}</p>}
            
            
                    <button
                      type='submit'
                      className={`cursor-pointer transition-all duration-100 active:scale-95 hover:bg-[#c82b2b] text-white mt-6 py-2 text-sm md:text-[16px] bg-[#E74041] flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 animate-spin' viewBox="0 0 24 24"><path fill="white" d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364"/></svg>
                      ) : (
                        "Create Session"
                      )}
                    </button>

      </form>
    </div>
  );
};
