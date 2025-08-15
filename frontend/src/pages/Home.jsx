import { AppContext } from '../context/appContext';
import { useContext } from 'react'
import logo from '../assets/logo.svg'
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

const Home = () => {
    const { userData } = useContext(AppContext);

    return (
    <div className="h-screen bg-slate-950">

        <div className="w-screen pt-[15vh] flex justify-center gap-10">
            <div className="profile w-[18vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex flex-col items-center justify-between text-white m-4 relative">

                {/* Profile Image */}
                <div className="w-full h-[10vh] relative mt-2">

                    <div className="w-6 h-6 rounded-full border-2 border-yellow-400 p-0.5 absolute top-0 left-0">
                        <span className="text-pink-600">
                            <img src={logo} />
                        </span>
                    </div>
                    <div className="w-20 h-20 rounded-full border-2 border-yellow-400 p-0.5 absolute top-8 right-[35%]">
                        <img
                            src="/assets/profile.png" // Replace with actual path
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Name & Role */}
                <div className="text-center leading-tight">
                    <h2 className="text-2xl font-semibold">{userData ? userData.name : "Hello Dev"}</h2>
                    <p className="text-xl text-purple-300">Web Developer</p>
                </div>

                {/* Short Bio */}
                <p className="text-l text-center px-2 text-white/80">
                    Uses <span className="text-yellow-400">Bootstrap</span> & <span className="text-yellow-400">Laravel</span>. Loves design via Figma. Lorem ipsum dolor sit amet.
                </p>

                {/* Email Button */}
                <button className="text-sm px-2 py-1 bg-purple-600 hover:bg-purple-700 transition rounded-md">
                    joeylenerivera@gmail.com
                </button>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 text-sm text-white/60">
                    <FaTwitter />
                    <FaInstagram />
                    <FaGithub />
                </div>

            </div>

            <div className='feed w-[60vw] h-[70vh] rounded-3xl flex justify-center'>
                <div className="suggestion w-[35%] h-[70%] bg-violet-950 rounded-2xl m-3 p-3 flex justify-center flex-col items-center gap-4">
                    <div className="profileimg h-[30%] w-[38%] rounded-full bg-fuchsia-400"></div>
                    <div className="name text-2xl text-white font-semibold">Joeylene Rivera</div>
                    <div className="skill text-l text-fuchsia-200 font-semibold">Web Developer</div>
                    <p className="about text-center text-white text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum corrupti quisquam et placeat fuga veritatis?</p>
                    <div className="buttons flex justify-evenly gap-4 w-[100%]">
                        <button className="interested bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl p-3 py-2 text-lg text-white">Reject</button>
                        <button className="connect bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl p-3 py-2 text-lg text-white">Connect</button>
                    </div>
                </div>
            </div>
            <div className='chat w-[22vw] bg-yellow-300 h-[50vh] rounded-3xl m-4'></div>
        </div>


    </div>

    )
}
export default Home
