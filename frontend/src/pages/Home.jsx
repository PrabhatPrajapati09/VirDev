import React, { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Home = () => {
  const { userData } = useContext(AppContext);

  // Safely format fields without changing your layout
  const displayName = userData?.name || 'Hello Dev';
  const displaySkills = Array.isArray(userData?.skills) ? userData.skills.join(', ') : (userData?.skills || 'Web Developer');
  const displayAbout = userData?.about || 'Uses Bootstrap & Laravel. Loves design via Figma. Lorem ipsum dolor sit amet.';
  const displayEmail = userData?.email || 'example@email.com';
  const profileImg = userData?.profile || '/assets/profile.png';

  return (
    <div className="h-screen bg-slate-950">
      <div className="w-screen pt-[15vh] flex justify-center gap-10">
        {/* LEFT PROFILE CARD */}
        <div className="profile w-[18vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex flex-col items-center justify-between text-white m-4 relative">
          {/* Profile Image header area */}
          <div className="w-full h-[10vh] relative mt-2">
            
            <div className="w-20 h-20 rounded-full border-2 border-yellow-400 p-0.5 absolute top-3 right-[35%]">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Name & Skills */}
          <div className="text-center leading-tight">
            <h2 className="text-2xl font-semibold">{displayName}</h2>
            <p className="text-l text-purple-300">{displaySkills}</p>
          </div>

          {/* About */}
          <p className="text-l text-center px-2 text-white/80">
            {displayAbout}
          </p>

          {/* Email */}
          <button className="text-sm px-2 py-1 bg-purple-600 hover:bg-purple-700 transition rounded-md">
            {displayEmail}
          </button>

          {/* Socials */}
          <div className="flex justify-center gap-4 text-sm text-white/60">
            <FaTwitter />
            <FaInstagram />
            <FaGithub />
          </div>
        </div>

        {/* CENTER FEED  */}
        <div className="feed w-[60vw] h-[70vh] rounded-3xl flex justify-center">
          <div className="suggestion w-[35%] h-[70%] bg-violet-950 rounded-2xl m-3 p-3 flex justify-center flex-col items-center gap-4">
            <div className="profileimg h-[30%] w-[38%] rounded-full bg-fuchsia-400"></div>
            <div className="name text-2xl text-white font-semibold">Joeylene Rivera</div>
            <div className="skill text-l text-fuchsia-200 font-semibold">Web Developer</div>
            <p className="about text-center text-white text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
              corrupti quisquam et placeat fuga veritatis?
            </p>
            <div className="buttons flex justify-evenly gap-4 w-[100%]">
              <button className="interested bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl p-3 py-2 text-lg text-white">
                Reject
              </button>
              <button className="connect bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl p-3 py-2 text-lg text-white">
                Connect
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CHAT  */}
        <div className="chat w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4"></div>
      </div>
    </div>
  );
};

export default Home;
