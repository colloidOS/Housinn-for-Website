import React from 'react';

const Navbar = () => {
  return (
    <div className=" top-0 w-full flex justify-between p-5">
      <nav>
        <ul className="flex space-x-6 text-white">
          <li><a href="#" className="hover:text-gray-300">Buy</a></li>
          <li><a href="#" className="hover:text-gray-300">Rent</a></li>
          <li><a href="#" className="hover:text-gray-300">Sell</a></li>
          <li><a href="#" className="hover:text-gray-300">Short Let</a></li>
        </ul>
      </nav>
      <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
        Sign in
      </button>
    </div>
  );
};

export default Navbar;
