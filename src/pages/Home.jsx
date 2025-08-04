import React from 'react'

const Home = () => {
    return (
        <div className="h-screen bg-black">
            <div className="h-screen bg-gradient-to-r from-rose-500/50 via-transparent to-blue-600/50">
            <div className="w-screen pt-[15vh] flex justify-center items-center gap-10">
                <div className='profile w-[18vw] bg-red-300 h-[50vh] rounded-3xl m-4'>
                    <div className="header bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 animate-gradient bg-[length:300%_300%] h-[15vh] rounded-t-3xl"></div>
                    <div className="information"></div>
                </div>
                <div className='feed w-[60vw] bg-blue-300 h-[50vh] rounded-3xl'></div>
                <div className='chat w-[22vw] bg-yellow-300 h-[50vh] rounded-3xl m-4'></div>
            </div>


            </div>
        </div>
    )
}
export default Home
