import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { LuLoader, LuPlus } from 'react-icons/lu';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { Card_BG } from '../../utils/data';
import { SummaryCard } from '../../components/Cards/SummaryCard';
import moment from "moment";
import { CreateSessionForm } from './CreateSessionForm';
import { Modal } from '../../Modal';
import { DeleteAlertContent } from '../../components/DeleteAlertContent';
import { toast } from "react-hot-toast";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateMode, setOpenCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [totalPages, setTotalPages] = useState(1);   // New state for total pages
  const [limit] = useState(0); // Number of sessions per page

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  });

  // get all sessions with pagination
  const fetchAllSessions = async () => {
    setIsLoading(true);
    try {
      // Pass page and limit as query parameters
      const response = await axiosInstance.get(`${API_PATHS.SESSION.GET_ALL}?page=${currentPage}&limit=${limit}`);
      setSessions(response.data.sessions); 
      setTotalPages(response.data.totalPages); 
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching all sessions", error);
      toast.error("Failed to fetch sessions.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      // After deletion, re-fetch sessions, potentially adjusting the current page if needed
      if (sessions.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1); // Go to previous page if last session on current page is deleted
      } else {
        fetchAllSessions(); // Re-fetch sessions for the current page
      }
    } catch (error) {
      console.error("Error deleting session data", error);
      toast.error("Failed to delete session.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, [currentPage]); // Re-fetch sessions whenever currentPage changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <DashboardLayout className="relative">
      <hr className='opacity-20 w-[95%] m-auto' />

      {isLoading && (
        <div className='absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
          <LuLoader className='text-4xl animate-spin opacity-50' />
        </div>
      )}

      <div className='w-[90%] m-auto mt-10'>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
          {sessions?.map((data, index) => {
            // Calculate the correct index for Card_BG based on the global sessions array
            const globalIndex = sessions.indexOf(data);
            return (
              <SummaryCard
                key={data?._id}
                colors={Card_BG[globalIndex % Card_BG.length]}
                role={data?.role || ""}
                experience={data?.experience || "-"}
                topicsToFocus={data?.topicsToFocus || ""}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            );
          })}
        </div>

        {sessions.length === 0 && !isLoading &&
          <div className='flex flex-col justify-center items-center pt-10'>
            <h1 className='text-[gray] text-xl'>"No Sessions. Please create your first Session"</h1>
            <img className='md:w-1/2' src="/noSessions.svg" alt="No Sessions" />
          </div>
        }

        {/* Pagination Controls */}
        {!isLoading && sessions?.length && totalPages > 1 ? <>
          <div className="flex justify-center items-center gap-4 mt-10 mb-20">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#212020] text-white rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black transition-all duration-200 active:scale-95"
            >
              Previous
            </button>
            <span className="text-[#393737] font-semibold">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#212020] text-white cursor-pointer rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black transition-all duration-200 active:scale-95"
            >
              Next
            </button>
          </div>
        </> : null}
          
        <button
          onClick={() => setOpenCreateMode(true)}
          className='flex items-center gap-1 cursor-pointer shadow-lg rounded-sm text-white bg-[#212020] hover:bg-black transition-all duration-100 hover:shadow-[#b1b1fa] hover:scale-105 active:scale-100 px-5 py-2 fixed bottom-10 right-10 md:right-20'
        >
          <LuPlus className='text-2xl text-white' /> Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateMode}
        onClose={() => {
          setOpenCreateMode(false);
          fetchAllSessions(); // Re-fetch sessions after creating a new one
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm
            onSessionCreated={() => {
              setOpenCreateMode(false);
              setCurrentPage(1); // Reset to first page after creating a new session
              fetchAllSessions();
            }}
          />
        </div>
      </Modal>

      {/* delete session */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Delete Alert"
      >
        <div>
          <DeleteAlertContent
            content="Are you sure you want to delete this session details?"
            onDelete={() => deleteSession(openDeleteAlert?.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};