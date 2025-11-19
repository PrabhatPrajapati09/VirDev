import React, { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const IDEA_CATEGORIES = [
  "Web Development", "Mobile Apps", "AI / Machine Learning", "DevOps", "Game Development",
  "Open Source Tools", "Education / Learning", "Blockchain", "Cybersecurity", "UI / UX Design", "Data Science"
];

const IdeaCreatePage = () => {
  const navigate = useNavigate();
  const { backendUrl, getIdeas } = useContext(AppContext);

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const createIdea = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/idea`,
        form,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Idea created!");
        getIdeas();
        navigate("/ideas");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <div className="w-[400px] bg-violet-950 p-6 rounded-2xl text-white">
        <h2 className="text-2xl font-bold mb-4">Create Idea</h2>

        <label>Category</label>
        <select
          name="category"
          className="w-full bg-violet-900 p-3 rounded-xl mb-3"
          onChange={handleChange}
          value={form.category}
          
        >
          <option value="">Select category</option>
          {IDEA_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          {/* <option value="Web App">Web App</option>
          <option value="Mobile App">Mobile App</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Game Dev">Game Dev</option>
          <option value="E-commerce">E-commerce</option> */}
        </select>

        <label>Idea Title</label>
        <input
          type="text"
          name="title"
          className="w-full bg-violet-900 p-3 rounded-xl mb-3"
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          className="w-full bg-violet-900 p-3 rounded-xl mb-3 h-32"
          onChange={handleChange}
        />

        <button
          onClick={createIdea}
          className="w-full py-3 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-xl font-semibold"
        >
          Post Idea
        </button>
      </div>
    </div>
  );
};

export default IdeaCreatePage;
