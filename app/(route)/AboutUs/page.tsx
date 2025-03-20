"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const teamMembers = [
    {
        name: "Deepak D Nayak",
        role: "Full Stack Developer",
        image: "/profiles/deepak.jpg",
        linkedin: "https://www.linkedin.com/in/deepakdnayak",
        github: "https://github.com/deepakdnayak",
        instagram: "https://www.instagram.com/deepaknayakk_/",
    },
    {
        name: "Prajwal S Tirthahalli ",
        role: "UI/UX Designer",
        image: "/profiles/prajwal.png",
        linkedin: "https://www.linkedin.com/in/prajwal-s-tirthahalli-385083242/",
        github: "https://github.com/Prajwal044",
        instagram: "https://www.instagram.com/prj004",
    },
    {
        name: "Member 3",
        role: "Frontend Developer",
        image: "/admin.png",
        linkedin: "#",
        github: "#",
        instagram: "#",
    },
    {
        name: "Member 4",
        role: "UI/UX Designer",
        image: "/admin.png",
        linkedin: "#",
        github: "#",
        instagram: "#",
    },
    {
        name: "Member 5",
        role: "Frontend Developer",
        image: "/admin.png",
        linkedin: "#",
        github: "#",
        instagram: "#",
    },
    {
        name: "Member 6",
        role: "UI/UX Designer",
        image: "/admin.png",
        linkedin: "#",
        github: "#",
        instagram: "#",
    },
    {
        name: "Member 7",
        role: "Frontend Developer",
        image: "/admin.png",
        linkedin: "#",
        github: "#",
        instagram: "#",
    },
    {
        name: "Member 8",
        role: "UI/UX Designer",
        image: "/admin.png",
        linkedin: "#",
        github: "#",
        instagram: "#",
    },
];


const About = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 text-gray-900 pt-12">
                {/* Hero Section */}
                <div className="text-center py-16 px-6">
                    <h1 className="text-4xl font-extrabold text-blue-500">About BitsUp</h1>
                    <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                        <b>BitsUp</b> is a platform designed to help students <b>enhance their aptitude</b> and
                        <b> coding skills</b> through engaging quizzes. It tracks scores, provides insightful
                        feedback, and makes learning fun!
                    </p>
                </div>

                {/* Team Section */}
                <div className="py-10">
                    <h2 className="text-3xl text-center font-semibold mb-8 text-blue-500">
                        Meet Our Team
                    </h2>

                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-200"
                                >
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={100}
                                        height={100}
                                        className="rounded-full border-2 border-blue-500 mx-auto"
                                    />
                                    <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                                    <p className="text-gray-600">{member.role}</p>

                                    {/* Social Icons */}
                                    <div className="mt-4 flex justify-center gap-4">
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600 transition-colors"
                                        >
                                            <FaLinkedin size={24} />
                                        </a>
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-700 hover:text-gray-900 transition-colors"
                                        >
                                            <FaGithub size={24} />
                                        </a>
                                        <a
                                            href={member.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-500 hover:text-pink-600 transition-colors"
                                        >
                                            <FaInstagram size={24} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
