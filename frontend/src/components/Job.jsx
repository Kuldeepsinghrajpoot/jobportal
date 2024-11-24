import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    // Function to calculate "days ago"
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="p-6 rounded-lg bg-card border">
            {/* Job Header */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-muted-foreground">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? 'Today'
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="ghost" className="rounded-full" size="icon">
                    <Bookmark className="h-5 w-5" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={job?.company?.logo} alt="Company Logo" />
                </Avatar>
                <div>
                    <h2 className="text-base font-semibold text-primary">{job?.company?.name}</h2>
                    <p className="text-sm text-muted-foreground">India</p>
                </div>
            </div>

            {/* Job Title and Description */}
            <div className="mb-4">
                <h1 className="text-lg font-bold text-primary">{job?.title}</h1>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {job?.description}
                </p>
            </div>

            {/* Badges Section */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className="font-semibold text-blue-600">
                    {job?.position} Positions
                </Badge>
                <Badge variant="secondary" className="font-semibold text-orange-600">
                    {job?.jobType}
                </Badge>
                <Badge variant="secondary" className="font-semibold text-purple-600">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    View Details
                </Button>
                <Button className="w-full sm:w-auto">Save for Later</Button>
            </div>
        </div>
    );
};

export default Job;
