import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import { AIResponsePreview } from "../../pages/InterviewPrep/AIResponsePreview";

export const QuestionCard = ({
  questionNumber,
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div  className="bg-white  border group border-gray-100/60 rounded-lg mb-4 overflow-hidden shadow-lg p-5 ">
        <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-start justify-between cursor-pointer">
          <div className="flex items-start lg:w-[60%] xl:w-[70%] gap-3">
            <span className="text-sm pt-1 flex font-semibold text-[gray]">Q. <span>{questionNumber}</span></span>
            <h3 className="text-lg font-semibold" onClick={toggleExpand}>
              {question}
            </h3>
          </div>

          <div className="flex items-center justify-end gap-3 ml-4 relative">

            <div className="flex gap-3">

              <button
                onClick={onTogglePin}
                className="flex items-center h-7 gap-2 text-sm text-rose-500 bg-rose-50 rounded px-3 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
              >
                {isPinned ? <LuPinOff /> : <LuPin />}
              </button>

              <button
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
                className =
                "flex items-center h-7 gap-2 text-sm bg-blue-50 rounded px-3 py-1 border text-blue-500 border-blue-100 hover:border-blue-300 cursor-pointer">
                <LuSparkles />
                Learn More
              </button>
            </div>

            <button
              className="text-[gray] cursor-pointer"
              onClick={toggleExpand}
            >
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      

     
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{maxHeight: `${height}px`}}>
        <div ref={contentRef} className="mt-4 py-3 rounded-lg bg-gray-50">     
              <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
    </>
  );
};
