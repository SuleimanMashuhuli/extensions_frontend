import React, { useState } from 'react';

export const Header = ({ onSearch, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-50 flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex flex-wrap justify-between items-center">
        <img src="/abc-logo.png" className="mr-6 h-12 sm:h-9" alt="abc logo" />
        <div className="font-semibold text-lg">Extensions System</div>
      </div>
      
      <div className="search-bar gap-4 flex">
        <label className="flex flex-wrap justify-between items-center text-lg">Search :</label>
        <input
          type="text"
          placeholder="Name or Department"
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-2 py-1 border border-black w-40 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />


        <button 
          onClick={onAdd}
          className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-semibold"
        >
          Add Ext.
        </button>
      </div>

     
    </header>
  );
};