import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Home = () => {
  const { userData, suggestions, getSuggestions, isLoggedin } = useContext(AppContext);

  const [index, setIndex] = useState(0);

  // Fetch suggestions when user logs in
  useEffect(() => {
    if (isLoggedin) {
      getSuggestions();
      setIndex(0);
    }
  }, [isLoggedin]);

  // current suggestion
  const current = suggestions[index] || null;

  // Next/Reject handler
  const next = () => {
    if (index + 1 < suggestions.length) {
      setIndex(index + 1);
    } else {
      setIndex(0); // optional: loop
    }
  };

  const reject = () => next();

  // Left profile data
  const displayName = userData?.name || "Hello Dev";
  const displaySkills = Array.isArray(userData?.skills)
    ? userData.skills.join(", ")
    : userData?.skills || "Web Developer";

  const displayAbout =
    userData?.about ||
    "Uses Bootstrap & Laravel. Loves design via Figma. Lorem ipsum dolor sit amet.";

  const displayEmail = userData?.email || "example@email.com";

  return (
    <div className="h-screen bg-slate-950">
      <div className="w-screen pt-[15vh] flex justify-center gap-10">

        {/* LEFT PROFILE CARD */}
        <div className="profile w-[18vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex flex-col items-center justify-between text-white m-4 relative">

          <div className="w-full h-[10vh] relative mt-2">
            <div className="w-20 h-20 rounded-full border-2 border-yellow-400 p-0.5 absolute top-3 right-[35%]">
              <img
                src={userData?.profile || "/assets/profile.png"}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="text-center leading-tight">
            <h2 className="text-2xl font-semibold">{displayName}</h2>
            <p className="text-l text-purple-300">{displaySkills}</p>
          </div>

          <p className="text-l text-center px-2 text-white/80">{displayAbout}</p>

          <button className="text-sm px-2 py-1 bg-purple-600 hover:bg-purple-700 transition rounded-md">
            {displayEmail}
          </button>

          <div className="flex justify-center gap-4 text-sm text-white/60">
            <FaTwitter />
            <FaInstagram />
            <FaGithub />
          </div>
        </div>

        {/* CENTER FEED (SUGGESTIONS) */}
        <div className="feed w-[60vw] h-[70vh] rounded-3xl flex justify-center">
          <div className="suggestion w-[35%] h-[70%] bg-violet-950 rounded-2xl m-3 p-3 flex justify-center flex-col items-center gap-4">

            {current ? (
              <>
                <div className="profileimg h-[30%] w-[38%] rounded-full overflow-hidden bg-fuchsia-400">
                  <img
                    src={current.profile || "/assets/profile.png"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="name text-2xl text-white font-semibold">
                  {current.username}
                </div>

                <div className="skill text-l text-fuchsia-200 font-semibold">
                  {Array.isArray(current.skills)
                    ? current.skills.join(", ")
                    : current.skills}
                </div>

                <p className="about text-center text-white text-sm px-2">
                  {current.about || "No bio available."}
                </p>

                <div className="buttons flex justify-evenly gap-4 w-[100%]">
                  <button
                    className="interested bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl p-3 py-2 text-lg text-white"
                    onClick={reject}
                  >
                    Reject
                  </button>
                  <button
                    className="connect bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl p-3 py-2 text-lg text-white"
                    onClick={next}
                  >
                    Connect
                  </button>
                </div>
              </>
            ) : (
              <p className="text-white text-center text-lg">No Suggestions Found</p>
            )}
          </div>
        </div>

        {/* RIGHT CHAT */}
        <div className='chat w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4'></div>
      </div>
    </div>
  );
};

export default Home;
