import { Link } from "react-router-dom"; // if you're using react-router

const Landing = () => {
  return (
    <div className="max-h-screen h-screen w-full bg-gray-800 text-white flex flex-col">
      

      <main className="flex-grow flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Upload. Ask. Discover.</h2>
          <p className="text-lg text-gray-300 mb-6">
            DocRag lets you upload documents and chat with them using AI. Get insights from specs, PDFs, and more in seconds.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-lg rounded-md font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </main>

      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} DocRag. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
