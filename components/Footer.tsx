import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Left Section - Branding & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">BitsUp</h2>
          <p className="mt-1">&copy; {new Date().getFullYear()} BitsUp. All rights reserved.</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-6 mt-4 md:mt-0">
          <Link href="tel:+919844416474">
            <span className="hover:text-white cursor-pointer">Help</span>
          </Link>
          <Link href="/#FAQ">
            <span className="hover:text-white cursor-pointer">FAQ</span>
          </Link>
          <Link href="/AboutUs">
            <span className="hover:text-white cursor-pointer">Contact</span>
          </Link>
          <Link href="/Quiz">
            <span className="hover:text-white cursor-pointer">Quizzes</span>
          </Link>
          <Link href="/LeaderBoard">
            <span className="hover:text-white cursor-pointer">Leaderboard</span>
          </Link>
        </div>

        {/* Right Section - Social Media & Contact */}
        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
          <p className="text-sm">Contact us: <a href="mailto:deepakdnayak2004@gmail.com" className="text-blue-400 hover:text-white">support@bitsup.com</a></p>
          <div className="flex space-x-4 mt-2">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaGithub size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
