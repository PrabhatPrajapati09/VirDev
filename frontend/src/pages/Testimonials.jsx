import { IoIosPerson } from "react-icons/io";

const Testimonials = () => {
  return (
    <div className="bg-slate-950">
      <div className="pt-[10vh] px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white p-2 leading-tight text-center mx-auto">
          What people are saying
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-white p-2 leading-tight text-center w-[90vw] sm:w-[70vw] md:w-[60vw] mx-auto">
          *These testimonials are for demonstration purposes only*
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="features w-full flex justify-center py-10">
        <div className="max-w-6xl w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {/* Testimonial Card */}
          <div className="p-6 rounded-2xl border border-transparent hover:border-pink-600 shadow-sm transition-transform hover:scale-[1.02] bg-slate-900">
            <p className="text-sm sm:text-base md:text-lg text-white italic leading-relaxed">
              ✨ "VirDev has a clean and intuitive design. Can't wait to try it live!"
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
