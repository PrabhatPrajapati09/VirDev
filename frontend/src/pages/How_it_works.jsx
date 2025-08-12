import { BsPersonBoundingBox, BsChatDots, } from 'react-icons/bs'
import { MdOutlineSwipe, MdNetworkCheck } from 'react-icons/md'
const How_it_works = () => {
    return (
        <div className="h-[60vh] bg-slate-900">
            <div className='pt-[10vh]'>

                <h1 className="text-6xl font-bold text-white p-2 leading-tight text-center mx-auto">
                    How It Works
                </h1>
                <h4 className="text-xl text-white p-2 leading-tight text-center w-[60vw] mx-auto">
                    Welcome to VirDev, Follow the steps below to get started:
                </h4>
            </div>
            <div className="symbols flex justify-around w-screen my-4">
                <div className='profile h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-full flex justify-center items-center text-4xl text-purple-500 relative'>
                    <div className="step w-7 rounded-full bg-fuchsia-500 text-white flex justify-center items-center text-lg absolute bottom-0 right-0">1</div>
                    <BsPersonBoundingBox />
                </div>
                <div className='match h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-full flex justify-center items-center text-4xl text-purple-500 relative'>
                    <div className="step w-7 rounded-full bg-fuchsia-500 text-white flex justify-center items-center text-lg absolute bottom-0 right-0">2</div>
                    <MdOutlineSwipe />
                </div>
                <div className='chat h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-full flex justify-center items-center text-4xl text-purple-500 relative'>
                    <div className="step w-7 rounded-full bg-fuchsia-500 text-white flex justify-center items-center text-lg absolute bottom-0 right-0">3</div>
                    <BsChatDots />
                </div>
                <div className='collaborate h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-full flex justify-center items-center text-4xl text-purple-500 relative'>
                    <div className="step w-7 rounded-full bg-fuchsia-500 text-white flex justify-center items-center text-lg absolute bottom-0 right-0">4</div>
                    <MdNetworkCheck />
                </div>
            </div>
            <div className="symbolinfo flex justify-around w-screen">
                <div className='w-[20%]'>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight text-center ">Create Profile</h2>
                    <h3 className="text-lg text-gray-300  leading-tight text-center">Create a profile to showcase your skills, interests and types of projects you want to work on.</h3>
                </div>
                <div className='w-[20%]'>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight text-center ">Swipe and Match</h2>
                    <h3 className="text-lg text-gray-300  leading-tight text-center">Browse through developer profiles and find developers who match your skills and interests</h3>
                </div>
                <div className='w-[20%]'>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight text-center ">Connect and Chat</h2>
                    <h3 className="text-lg text-gray-300  leading-tight text-center">Once connected chat and discuss your ideas and thoughts about potential projects</h3>
                </div>
                <div className='w-[20%]'>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight text-center ">Collaborate</h2>
                    <h3 className="text-lg text-gray-300  leading-tight text-center">Start to collaborate on projects and work together to bring your ideas to life</h3>
                </div>

            </div>

        </div>
    )
}

export default How_it_works
