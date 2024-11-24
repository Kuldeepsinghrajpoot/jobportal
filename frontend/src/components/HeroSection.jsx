import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-800 to-blue-600 text-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 py-20 px-6 lg:px-0 text-center animate-fadeIn">
        <span className="mx-auto px-5 py-2 rounded-full bg-primary text-white font-medium shadow-md animate-bounce"> Your No. 1 Job Search Partner </span>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-snug"> Find & Achieve Your <br />
          <span className="text-primary">Dream Job</span>
        </h1>
        <p className="text-gray-300 max-w-lg text-sm lg:text-lg"> Discover thousands of job opportunities, apply effortlessly, and take a step toward your successful career. </p>
        {/* Search Bar */}
        <div className="flex w-full lg:w-[50%] h-16 shadow-lg rounded-lg overflow-hidden bg-white animate-slideIn">
          <input type="text" placeholder="Search for jobs, titles, or keywords..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-grow px-4 text-gray-800 focus:outline-none text-sm" />
          <Button onClick={searchJobHandler} className="flex items-center justify-center h-full px-6 bg-primary text-white hover:bg-primary-dark transition" >
            <Search className="h-5 w-5" />
          </Button> </div>
      </div>
    </div>
  );
};

export default HeroSection;
