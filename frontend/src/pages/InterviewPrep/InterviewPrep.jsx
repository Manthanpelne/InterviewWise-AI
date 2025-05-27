import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoleInfoHeader } from "../../components/RoleInfoHeader";
import moment from "moment";
import { DashboardLayout } from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { AnimatePresence, motion } from "framer-motion";
import { QuestionCard } from "../../components/Cards/QuestionCard";
import { LuCircle, LuListCollapse, LuLoader } from "react-icons/lu";
import { AIResponsePreview } from "./AIResponsePreview";
import { Drawer } from "../../components/Drawer";
import { SkeletonLoader } from "../../components/Loader/SkeletonLoader";
import { toast } from "react-hot-toast";

export const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  //fetching data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //generate concept explanation
  const generateConceptExplanation = async (question) => {
    try {
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATIONS,
        {
          question,
        }
      );
      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Try again later");
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  //pin question feature
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
  
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  //add more questions to the session using AI
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      //calling api to generate more questions
      const ai_response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const newQuestions = ai_response.data;

      //updating session with new set of questions
      const newGeneratedQuestions = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: newQuestions,
        }
      );

      if (newGeneratedQuestions.data) {
        toast.success("Added more Q&A !!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, []);

  //console.log("sessionData:", sessionData)

  return (
    <DashboardLayout>
      <hr className="w-[95%] m-auto opacity-30" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 100,
            delay: 4 * 0.1,
            damping: 15,
          }}
        >
          <RoleInfoHeader
            role={sessionData?.role || ""}
            experience={sessionData?.experience || ""}
            topicsToFocus={sessionData?.topicsToFocus || ""}
            questions={sessionData?.questions?.length || ""}
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData?.updatedAt).format("Do MMM YYYY")
                : ""
            }
          />

          {/* Q and A */}
          <div className="mx-auto w-[90%] m-auto mt-10 md:mt-16">
            <h2 className="text-2xl font-semibold">Interview Q & A</h2>

            <div className="grid grid-cols-12 gap-4 my-5">
              <div
                className={`col-span-12 ${
                  openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
                }`}
              >
                {sessionData?.questions?.map((data, index) => {
                  return (
                    <motion.div
                      key={data._id || index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1,
                        damping: 15,
                      }}
                      layout //this is key prop that animates position changes
                      layoutId={`question-${data._id || index}`} //helps framer track specific item
                    >
                      <QuestionCard
                        questionNumber={index + 1}
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => {
                          generateConceptExplanation(data?.question);
                        }}
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                      />

                      {!isLoading &&
                        sessionData?.questions?.length == index + 1 && (
                          <div className="flex items-center justify-center mt-10">
                            <button
                              className="flex items-center gap-3 hover:bg-black text-sm text-white bg-[#1f1e1e] px-5 py-2 text-nowrap cursor-pointer rounded"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <LuLoader className="animate-spin text-white" />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}{" "}
                              Load More
                            </button>
                          </div>
                        )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* drawer */}
            <Drawer
              isOpen={openLearnMoreDrawer}
              onClose={() => setOpenLearnMoreDrawer(false)}
              title={!isLoading && explanation?.title}
            >
              {errorMsg && (
                <p className="flex gap-2 text-sm text-rose-500">
                  <LuCircle />
                </p>
              )}
              {isLoading && <SkeletonLoader />}
              {!isLoading && explanation && (
                <AIResponsePreview content={explanation?.explanation} />
              )}
            </Drawer>
          </div>
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};
