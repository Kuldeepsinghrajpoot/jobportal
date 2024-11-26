import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Input } from './ui/input';

const Browse = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        if (searchedQuery) {
            setFilteredJobs(
                allJobs.filter((job) =>
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase())
                )
            );
        } else {
            setFilteredJobs(allJobs);
        }
    }, [searchedQuery, allJobs]);

    if (!allJobs || allJobs.length === 0) {
        return (
            <div className="bg-muted/40 min-h-screen flex items-center justify-center">
                <p>Loading jobs...</p>
            </div>
        );
    }

    return (
        <div className='bg-muted/40 min-h-screen'>
            <Navbar />
            <div className='h-full w-full flex flex-col justify-between'>
                <div className='flex flex-col items-center'>
                    {/* Centered Search Bar */}
                    <div className="top-1/4 py-8 w-4/6">
                        <h1 className="text-4xl font-bold text-center mb-8">
                            Find Your Dream Job
                        </h1>
                        <Input
                            type="text"
                            value={searchedQuery}
                            onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
                            placeholder="Search jobs..."
                            className="w-full h-14 px-6 py-4 text-2xl font-semibold rounded-lg
                             shadow-md  focus:shadow-primary/50
                            transition-shadow duration-300 ease-in-out  border"
                        />
                    </div>
                </div>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='font-bold text-xl mb-10'>
                        Search Results ({filteredJobs.length})
                    </h1>
                    <div className='grid grid-cols-3 gap-4 pb-4'>
                        {filteredJobs.map((job) => (
                            <div
                                key={job._id}
                                
                            >
                                <Job job={job} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Browse;
