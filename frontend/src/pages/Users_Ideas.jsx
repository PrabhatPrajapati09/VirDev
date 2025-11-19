import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const MyIdeas = () => {
  const { backendUrl } = useContext(AppContext);
  const [ideas, setIdeas] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const getMyIdeas = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/myideas`, {
        withCredentials: true
      });

      if (data.success) setIdeas(data.ideas);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/delete-idea/${deleteId}`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Idea deleted");
        setIdeas(ideas.filter(i => i.ideaId !== deleteId));
      }
      setDeleteId(null);
    } catch (err) {
      toast.error("Failed to delete idea");
      console.error(err);
    }
  };

  useEffect(() => {
    getMyIdeas();
  }, []);

  return (
    <div className="h-screen bg-slate-950">
      <Home_Navbar />

      <div className="w-screen pt-[15vh] flex justify-center">
        <div className="ideas-feed w-[60vw] h-[70vh] bg-violet-900 rounded-3xl p-6 overflow-y-auto scrollbar-hide m-4">

          <h2 className="text-white text-3xl font-bold mb-6">My Ideas</h2>

          {ideas.length === 0 ? (
            <p className="text-gray-300">You haven't created any ideas yet.</p>
          ) : (
            ideas.map((idea) => (
              <div key={idea.ideaId} className="bg-violet-950 p-5 rounded-2xl mb-6 shadow-lg">
                <p className="text-fuchsia-400 font-semibold">{idea.category}</p>
                <h3 className="text-white text-xl font-semibold">{idea.title}</h3>
                <p className="text-gray-300 mt-2">{idea.description}</p>

                <div className="flex justify-end">
                  <button
                    className="bg-red-600 px-4 py-2 mt-4 text-white rounded-2xl hover:bg-red-700"
                    onClick={() => setDeleteId(idea.ideaId)}
                  >
                    Delete Idea
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DELETE POPUP */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-slate-800 p-6 rounded-2xl w-[350px] text-white text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this idea?</p>

            <div className="flex justify-center gap-4 mt-6">
              <button 
                className="bg-red-600 px-4 py-2 rounded-xl"
                onClick={confirmDelete}
              >
                Yes, delete
              </button>

              <button 
                className="bg-gray-500 px-4 py-2 rounded-xl"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyIdeas;
