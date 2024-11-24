import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="bg-muted/40 flex-grow flex">
                {/* Static Filter Section */}
                <div className="w-[20%] bg-background shadow-md h-[calc(100vh-64px)] sticky top-16 p-4">
                    <FilterCard />
                </div>

                {/* Job List Section */}
                <div className="flex-1 p-6 h-[calc(100vh-64px)] overflow-y-auto">
                    {filterJobs.length <= 0 ? (
                        <div className="text-center ">No jobs found</div>
                    ) : (
                        <div className="grid grid-cols-3 gap-6">
                            {filterJobs.map((job) => (
                                <motion.div
                                    key={job?._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
