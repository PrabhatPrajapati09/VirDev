import { IoIosPerson } from "react-icons/io"
const Testimonials = () => {
    return (
        <div className="h-[60vh] bg-slate-950">
            <div className='pt-[10vh]'>

                <h1 className="text-6xl font-bold text-white p-2 leading-tight text-center mx-auto">
                    What people are saying
                </h1>
                <p className="text-xl text-white p-2 leading-tight text-center w-[60vw] mx-auto">
                    *These testimonials are for demonstration purposes only*
                </p>
            </div>

            <div className="features h-[30vh] w-[100vw] flex items-center justify-evenly flex-wrap">

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Testimonial Card */}
                    <div className="p-6 rounded-2xl border border-transparent hover:border-pink-600 shadow-sm transition-transform hover:scale-[1.02] bg-slate-900">
                        <p className="text-white italic leading-relaxed">
                            ✨ "VirDev has a clean and intuitive design. Can't wait to try it live!"
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-3xl"><IoIosPerson /></div>
                            <div>
                                <p className="font-semibold text-white">Jane Doe</p>
                                <p className="text-xs text-gray-400">Web Designer (Demo)</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-transparent hover:border-pink-600 shadow-sm transition-transform hover:scale-[1.02] bg-slate-900">
                        <p className="text-white italic leading-relaxed">
                            ✨ "If this platform launches soon, it’ll be a game-changer!"
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-3xl"><IoIosPerson /></div>
                            <div>
                                <p className="font-semibold text-white">John Smith</p>
                                <p className="text-xs text-gray-400">Full-Stack Dev (Demo)</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-transparent hover:border-pink-600 shadow-sm transition-transform hover:scale-[1.02] bg-slate-900">
                        <p className="text-white italic leading-relaxed">
                            ✨ "A solid concept. Looking forward to the final release!"
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-3xl"><IoIosPerson /></div>
                            <div>
                                <p className="font-semibold text-white">Alex Rivera</p>
                                <p className="text-xs text-gray-400">Tech Enthusiast (Demo)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
