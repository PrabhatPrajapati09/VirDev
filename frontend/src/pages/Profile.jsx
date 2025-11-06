import React from 'react'
import { AppContext } from '../context/appContext';
import { useContext } from 'react'


const Profile = () => {
    const { userData } = useContext(AppContext);


    return (
        <div className='h-screen bg-slate-900 w-screen flex justify-center items-center'>
            <div className="outercontainer w-[70vw] h-[80vh] flex justify-evenly items-start">

                <div className="profilecard w-[45%] flex flex-col justify-center items-center gap-3">
                    <div className="profile w-[18vw] bg-violet-950 rounded-3xl p-3 flex flex-col items-center border-[5px] border-fuchsia-400 justify-between text-white m-4 relative gap-6">

                        {/* Profile Image */}
                        <div className="w-full h-[10vh] relative mt-2">

                            <div className="w-20 h-20 rounded-full border-2 border-yellow-400 p-0.5 absolute top-3 right-[35%]">
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
                            <p className="text-xl text-purple-300">{userData ? userData.skills : " "}</p>
                        </div>

                        {/* Short Bio */}
                        <p className="text-l text-center px-2 text-white/80">
                            {userData ? "About:" + userData.about : " "}
                        </p>

                        {/* Email Button */}
                        <button className="text-sm px-2 py-1 bg-purple-600 hover:bg-purple-700 transition rounded-md">
                            {userData ? userData.email : " "}
                        </button>

                        {/* Social Icons */}
                        {/* <div className="flex justify-center gap-4 text-sm text-white/60">
                            <FaTwitter />
                            <FaInstagram />
                            <FaGithub />
                        </div> */}

                    </div>
                </div>
                <div className="profileupdationbox w-[65%] flex flex-col justify-center items-center gap-3">
                    <div className="profile w-[27vw] bg-violet-950 rounded-3xl p-3 flex flex-col  border-[5px] border-fuchsia-400 justify-between text-white m-4 relative gap-3">

                        <p className="text-2xl font-semibold text-center">Edit Profile</p>
                        <div className="firstname">
                            <p className="text-lg">First Name:</p>
                            <input type="text" placeholder="Enter First Name" className='bg-violet-900 rounded-2xl p-3 w-full' value={userData ? userData.firstname : ' '}/>
                        </div>
                        <div className="lastname">
                            <p className="text-lg">Last Name:</p>
                            <input type="text" placeholder="Enter Last Name" className='bg-violet-900 rounded-2xl p-3 w-full' value={userData ? userData.lastname : ' '}/>
                        </div>
                        <div className="ageandgender flex gap-6">
                            <div className="age">

                                <p className="text-lg">Age:</p>
                                <input type="text" placeholder="Enter Age" className='bg-violet-900 rounded-2xl p-3' value={userData ? userData.age : ' '}/>
                            </div>
                            <div className="gender">
                                <p className="text-lg">Gender:</p>
                                <select name="gender" id="gender " className="bg-violet-900 rounded-2xl p-3 w-[200%]" value={userData ? userData.gender : ' '}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="about">
                            <p className="text-lg">About:</p>
                            <textarea placeholder="Enter About Yourself" className='bg-violet-900 rounded-2xl p-3 w-full' value={userData ? userData.about : ' '}/>
                        </div>
                        <div className="skills">
                            <p className="text-lg">Skills:</p>
                            <input type="text" placeholder="Enter Skills" className='bg-violet-900 rounded-2xl p-3 w-full' value={userData ? userData.skills : ' '}/>
                        </div>
                        <div className="submit text-center mt-4">
                            <button className="text-xl px-2 py-1 bg-purple-600 hover:bg-purple-700 transition rounded-2xl w-[80%]">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
