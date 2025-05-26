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

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(6); // Number of sessions to display per page

  // Get current sessions for the page
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);

  // Calculate total pages
  const totalPages = Math.ceil(sessions.length / sessionsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // get all sessions
  const fetchAllSessions = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
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
      fetchAllSessions(); // Re-fetch sessions after deletion
    } catch (error) {
      console.error("Error deleting session data", error);
      toast.error("Failed to delete session.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout className="relative">
      <hr className='opacity-20 w-[95%] m-auto' />

      {isLoading && (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <LuLoader className='text-4xl animate-spin opacity-50' />
        </div>
      )}

      <div className='w-[90%] m-auto mt-10'>
        {sessions?.length ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
              {currentSessions?.map((data, index) => {
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === i + 1
                        ? 'bg-[#E74041] cursor-pointer hover:bg-[#c62e2e] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 cursor-pointer rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className='flex flex-col justify-center items-center pt-10'>
              <h1 className='text-[gray] text-xl'>"No Sessions. Please create your first Session"</h1>
              <img className='md:w-1/2' src="/noSessions.svg" alt="No Sessions" />
            </div>
          </>
        )}

        <button
          onClick={() => setOpenCreateMode(true)}
          className='flex items-center gap-1 cursor-pointer shadow-lg rounded-sm text-white bg-[#212020] hover:bg-black transition-all duration-200 active:scale-95 px-5 py-2 fixed bottom-10 right-10 md:right-20'
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
