const About = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Shining Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.15),_transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-10 left-5 w-28 h-28 sm:w-40 sm:h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-60 sm:h-60 bg-purple-500/20 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute top-1/3 right-[10%] w-32 h-32 sm:w-48 sm:h-48 bg-indigo-500/20 rounded-full blur-3xl animate-ping"></div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-300 my-4">
          About VirDev
        </h2>
        <p className="max-w-5xl mx-auto text-gray-300 leading-relaxed text-base sm:text-lg md:text-xl">
          VirDev is a collaborative platform for developers to showcase their projects, 
          connect with others, and form teams based on skills and interests.
          <br /><br />
          Built using the <span className="text-purple-400 font-semibold">MERN Stack</span>, 
          this project was created as part of my final year portfolio to simulate 
          a real-world full-stack development experience.
          <br /><br />
          From UI/UX design to backend integration, VirDev reflects my journey 
          as a <span className="text-gray-100 font-medium">BSc IT student</span> passionate 
          about coding, design, and solving real-world problems.
        </p>
      </div>
    </div>
  );
};

export default About;
