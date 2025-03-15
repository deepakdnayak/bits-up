import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-lg">&copy; {new Date().getFullYear()} BitsUp. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/about">
            <span className="hover:text-white cursor-pointer">About</span>
          </Link>
          <Link href="/faq">
            <span className="hover:text-white cursor-pointer">FAQ</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-white cursor-pointer">Contact</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
