

const About = () => {
    return (
        <div className="h-[58vh] bg-gradient-to-r from-rose-500/50 via-transparent to-blue-600/50">

            <div className="px-6 text-center pt-[10vh]">
                <h2 className="text-6xl font-bold text-gray-300 my-4">About VirDev</h2>
                <p className="max-w-5xl mx-auto text-gray-600 leading-relaxed text-xl">
                    VirDev is a collaborative platform for developers to showcase their projects, connect with others, and form teams based on skills and interests.
                    <br /><br />
                    Built using the <span className="text-purple-600 font-semibold">MERN Stack</span>, this project was created as part of my final year portfolio to simulate a real-world full-stack development experience.
                    <br /><br />
                    From UI/UX design to backend integration, VirDev reflects my journey as a BSc IT student passionate about coding, design, and solving real-world problems.
                </p>
            </div>

        </div>
    )
}

export default About
