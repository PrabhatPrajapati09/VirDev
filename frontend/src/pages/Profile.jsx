import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from "../assets/logo.svg";

const skillSuggestions = [
  "HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB",
  "Python", "Django", "Flask", "TypeScript", "Vue.js", "Angular", 
  "Next.js", "Tailwind CSS", "C++", "Java", "C#", "SQL", "PostgreSQL",
  "Firebase", "AWS", "Docker", "Kubernetes", "Git", "Figma", "UI/UX",
  "Machine Learning", "Data Analysis", "DevOps", "Cybersecurity"
];

const Profile = () => {
  const { userData, backendUrl, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    age: '',
    gender: '',
    about: '',
    skills: [],
    skillInput: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        age: userData.age || '',
        gender: userData.gender || '',
        about: userData.about || '',
        skills: Array.isArray(userData.skills)
          ? userData.skills
          : userData.skills
          ? userData.skills.split(',').map(s => s.trim())
          : [],
        skillInput: ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const { skillInput, ...updatedData } = formData;
      const { data } = await axios.put(`${backendUrl}/api/user/update`, updatedData, {
        withCredentials: true
      });

      if (data.success) {
        toast.success("Profile updated successfully!");
        getUserData(); // refresh context data
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error while updating profile");
    }
  };

  return (
    <div className='min-h-screen bg-slate-900 w-screen flex justify-center items-center flex-col text-white'>

      {/* Header */}
      <div className="header w-full flex justify-between items-center px-6 md:px-10 py-4">
        <div 
          className="logo font-bold text-4xl flex gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <span className="w-10 text-fuchsia-500">
            <img src={logo} alt="VirDev Logo" />
          </span>
          <div className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            VirDev
          </div>
        </div>

        <div 
          className="closeprofile cursor-pointer hover:text-fuchsia-500 w-10 h-10 bg-slate-700 rounded-xl flex justify-center items-center text-2xl"
          onClick={() => navigate("/home")}
        >
          X
        </div>
      </div>

      {/* Main Container */}
      <div className="outercontainer w-[90vw] md:w-[70vw] flex flex-col md:flex-row justify-evenly items-start p-5 gap-6">

        {/* Left Profile Card */}
        <div className="profilecard w-full md:w-[30%] flex flex-col justify-center items-center">
          <div className="profile w-full bg-violet-950 rounded-3xl p-6 flex flex-col items-center border-[5px] border-fuchsia-400 text-white gap-6 shadow-lg">

            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden">
              <img src={userData?.profile || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* Name & Skills */}
            <div className="text-center leading-tight">
              <h2 className="text-2xl font-semibold">{userData?.name || "Hello Dev"}, {userData?.age || " "}</h2>
              <p className="text-lg text-purple-300">{Array.isArray(userData?.skills) ? userData.skills.join(", ") : userData?.skills || "No skills yet"}</p>
            </div>

            {/* About */}
            <p className="text-base text-center px-3 text-white/80">
              {userData?.about || "No bio available yet."}
            </p>

            {/* Email */}
            <button className="text-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-md">
              {userData?.email || "example@email.com"}
            </button>
          </div>
        </div>

        {/* Right Profile Update Box */}
        <div className="profileupdationbox w-full md:w-[55%] flex flex-col justify-center items-center">
          <div className="profile bg-violet-950 rounded-3xl p-6 flex flex-col border-[5px] border-fuchsia-400 text-white w-full max-w-[500px] shadow-lg">

            <p className="text-2xl font-semibold text-center mb-4">Edit Profile</p>

            <div className="flex flex-col gap-4">

              {/* First Name */}
              <div>
                <p className="text-lg">First Name:</p>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Enter First Name"
                  className="bg-violet-900 rounded-2xl p-3 w-full"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>

              {/* Last Name */}
              <div>
                <p className="text-lg">Last Name:</p>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Enter Last Name"
                  className="bg-violet-900 rounded-2xl p-3 w-full"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>

              {/* Age & Gender */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-lg">Age:</p>
                  <input
                    type="text"
                    name="age"
                    placeholder="Enter Age"
                    className="bg-violet-900 rounded-2xl p-3 w-full"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg">Gender:</p>
                  <select
                    name="gender"
                    className="bg-violet-900 rounded-2xl p-3 w-full"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Skills (moved above About) */}
              <div className="skills relative">
                <p className="text-lg mb-2">Skills:</p>

                {/* Selected Skills */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {Array.isArray(formData.skills) && formData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-fuchsia-600/40 border border-fuchsia-400 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {skill}
                      <button
                        type="button"
                        className="text-xs text-white/80 hover:text-white"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            skills: prev.skills.filter((s) => s !== skill)
                          }));
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  name="skills"
                  placeholder="Type a skill..."
                  className="bg-violet-900 rounded-2xl p-3 w-full text-white"
                  value={formData.skillInput}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, skillInput: e.target.value }))
                  }
                />

                {/* Suggestions Dropdown */}
                {formData.skillInput && (
                  <div className="absolute z-20 bg-violet-800/90 backdrop-blur-md mt-1 rounded-2xl w-full border border-fuchsia-500/30 max-h-40 overflow-y-auto">
                    {skillSuggestions
                      .filter(
                        (s) =>
                          s.toLowerCase().includes(formData.skillInput.toLowerCase()) &&
                          !formData.skills.includes(s)
                      )
                      .slice(0, 6)
                      .map((s, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              skills: [...prev.skills, s],
                              skillInput: ''
                            }));
                          }}
                          className="px-4 py-2 text-white hover:bg-fuchsia-600/40 cursor-pointer rounded-2xl transition-all"
                        >
                          {s}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* About */}
              <div>
                <p className="text-lg">About:</p>
                <textarea
                  name="about"
                  placeholder="Enter About Yourself"
                  className="bg-violet-900 rounded-2xl p-3 w-full"
                  value={formData.about}
                  onChange={handleChange}
                />
              </div>

              {/* Update Button */}
              <div className="text-center mt-4">
                <button
                  className="text-xl px-2 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-2xl w-[80%]"
                  onClick={handleUpdate}
                >
                  Update Profile
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
