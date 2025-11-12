import { IoIosPerson } from "react-icons/io";

const Testimonials = () => {
  return (
    <div className="bg-slate-950 relative overflow-hidden min-h-[60vh] flex flex-col justify-center">
      {/* Shining gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.15),_transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-10 left-5 w-28 h-28 sm:w-40 sm:h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-60 sm:h-60 bg-purple-500/20 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute top-1/3 right-[10%] w-32 h-32 sm:w-48 sm:h-48 bg-indigo-500/20 rounded-full blur-3xl animate-ping"></div>

      {/* Content */}
      <div className="pt-[10vh] px-4 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white p-2 leading-tight text-center mx-auto">
          What People Are Saying
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-white p-2 leading-tight text-center w-[90vw] sm:w-[70vw] md:w-[60vw] mx-auto">
          *These testimonials are for demonstration purposes only*
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="features w-full flex justify-center py-10 relative z-10">
        <div className="max-w-6xl w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {/* Testimonial Card 1 */}
          <div className="p-6 rounded-2xl border border-transparent hover:border-pink-600 shadow-sm transition-transform hover:scale-[1.02] bg-slate-900">
            <p className="text-sm sm:text-base md:text-lg text-white italic leading-relaxed">
              ✨ "VirDev has a clean and intuitive design. Can't wait to try it
              live!"
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl sm:text-3xl">
                <IoIosPerson />
              </div>
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  Jane Doe
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  Web Designer (Demo)
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="p-6 rounded-2xl border border-transparent hover:border-pink-600 shadow-sm transition-transform hover:scale-[1.02] bg-slate-900">
            <p className="text-sm sm:text-base md:text-lg text-white italic leading-relaxed">
              ✨ "If this platform launches soon, it’ll be a game-changer!"
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl sm:text-3xl">
                <IoIosPerson />
              </div>
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  John Smith
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  Full-Stack Dev (Demo)
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div className="p-6 rounded-2xl border border-transparent hover:border-pink-600 shadow-sm transition-transform hover:scale-[1.02] bg-slate-900">
            <p className="text-sm sm:text-base md:text-lg text-white italic leading-relaxed">
              ✨ "A solid concept. Looking forward to the final release!"
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl sm:text-3xl">
                <IoIosPerson />
              </div>
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  Alex Rivera
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  Tech Enthusiast (Demo)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
