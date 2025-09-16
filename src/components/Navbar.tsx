import { FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Login Page</h1>

      <div className="flex gap-8">
        <a href="#" className="hover:text-gray-200">Home</a>
        <a href="#" className="hover:text-gray-200">About</a>
        <a href="#" className="hover:text-gray-200">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
