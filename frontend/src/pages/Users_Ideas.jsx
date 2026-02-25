import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyIdeas = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [ideas, setIdeas] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [expandedIdea, setExpandedIdea] = useState(null);

  const [editIdea, setEditIdea] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: ""
  });

  // ---------------- FETCH IDEAS ----------------
  const getMyIdeas = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/myideas`,
        { withCredentials: true }
      );

      if (data.success) setIdeas(data.ideas);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- DELETE ----------------
  const confirmDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/user/delete-idea/${deleteId}`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Idea deleted");
        setIdeas(prev => prev.filter(i => i.ideaId !== deleteId));
      }

      setDeleteId(null);
    } catch (err) {
      toast.error("Failed to delete idea");
    }
  };

  // ---------------- OPEN EDIT ----------------
  const openEditModal = (idea) => {
    setEditIdea(idea.ideaId);
    setFormData({
      category: idea.category,
      title: idea.title,
      description: idea.description
    });
  };

  // ---------------- UPDATE IDEA ----------------
  const updateIdea = async () => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/update-idea/${editIdea}`,
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Idea updated");

        setIdeas(prev =>
          prev.map(i =>
            i.ideaId === editIdea ? { ...i, ...formData } : i
          )
        );

        setEditIdea(null);
      }
    } catch {
      toast.error("Failed to update idea");
    }
  };

  useEffect(() => {
    getMyIdeas();
  }, []);

  return (
    <div className="h-screen bg-slate-950">
      <Home_Navbar />

      <div className="w-screen pt-[15vh] flex justify-center">
        <div className="w-[60vw] h-[70vh] bg-violet-900 rounded-3xl p-6 overflow-y-auto m-4">

          <h2 className="text-white text-3xl font-bold mb-6">My Ideas</h2>

          {ideas.length === 0 ? (
            <p className="text-gray-300">
              You haven't created any ideas yet.
            </p>
          ) : (
            ideas.map((idea) => (
              <div
                key={idea.ideaId}
                className="bg-violet-950 p-5 rounded-2xl mb-6 shadow-lg"
              >
                {/* CATEGORY */}
                <p className="text-fuchsia-400 font-semibold">
                  {idea.category}
                </p>

                {/* TITLE */}
                <h3 className="text-white text-xl font-semibold">
                  {idea.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-300 mt-2">
                  {idea.description}
                </p>

                {/* 🔥 INTEREST COUNT */}
                <div className="mt-3 text-sm text-purple-300 font-semibold">
                  {idea.interestCount} Developers Interested
                </div>

                {/* TOGGLE INTERESTED USERS */}
                {idea.interestCount > 0 && (
                  <button
                    className="text-xs text-fuchsia-400 mt-2"
                    onClick={() =>
                      setExpandedIdea(
                        expandedIdea === idea.ideaId ? null : idea.ideaId
                      )
                    }
                  >
                    {expandedIdea === idea.ideaId
                      ? "Hide Interested Developers"
                      : "View Interested Developers"}
                  </button>
                )}

                {/* 🔥 INTERESTED USERS LIST */}
                {expandedIdea === idea.ideaId && (
                  <div className="mt-4 space-y-3 bg-black/20 p-4 rounded-xl">
                    {idea.interestedUsers.map((entry) => (
                      <div
                        key={entry.user._id}
                        className="flex justify-between items-center bg-slate-800 p-3 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={entry.user.profilePic || "/user.png"}
                            className="w-10 h-10 rounded-full object-cover"
                            alt="user"
                          />
                          <div>
                            <p className="text-white font-semibold">
                              {entry.user.firstname} {entry.user.lastname}
                            </p>
                            <p className="text-xs text-purple-300">
                              {entry.user.skills?.slice(0, 2).join(", ")}
                            </p>
                          </div>
                        </div>

                        {/* ACTION BUTTON LOGIC */}
                        {entry.isConnected ? (
                          <button
                            onClick={() => navigate("/messages")}
                            className="bg-fuchsia-600 px-4 py-1 text-white rounded-xl text-sm"
                          >
                            Message
                          </button>
                        ) : entry.hasPending ? (
                          <button
                            onClick={() => navigate("/requests")}
                            className="bg-yellow-600 px-4 py-1 text-white rounded-xl text-sm"
                          >
                            Accept Request
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No Action
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* EDIT + DELETE */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="bg-blue-600 px-4 py-2 text-white rounded-2xl"
                    onClick={() => openEditModal(idea)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 px-4 py-2 text-white rounded-2xl"
                    onClick={() => setDeleteId(idea.ideaId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-slate-800 p-6 rounded-2xl text-white">
            <p>Confirm Delete?</p>
            <div className="flex gap-4 mt-4">
              <button onClick={confirmDelete} className="bg-red-600 px-4 py-2 rounded-xl">
                Yes
              </button>
              <button onClick={() => setDeleteId(null)} className="bg-gray-500 px-4 py-2 rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL (UNCHANGED LOGIC) */}
      {editIdea && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-slate-800 p-6 rounded-2xl w-[450px] text-white">

            <input
              type="text"
              value={formData.category}
              disabled
              className="p-3 rounded-xl bg-slate-700 opacity-60 w-full mb-3"
            />

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="p-3 rounded-xl bg-slate-700 w-full mb-3"
            />

            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="p-3 rounded-xl bg-slate-700 w-full mb-3"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setEditIdea(null)} className="bg-gray-500 px-4 py-2 rounded-xl">
                Cancel
              </button>
              <button onClick={updateIdea} className="bg-fuchsia-600 px-4 py-2 rounded-xl">
                Update
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyIdeas;