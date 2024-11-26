import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-6 rounded  shadow-md  bg-card border cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            aria-label={`View details for ${job?.title} at ${job?.company?.name}`}
        >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
                    </Avatar>
                    <div>
                        <h1 className="font-semibold text-lg text-primary">{job?.company?.name}</h1>
                        <p className="text-sm text-muted-foreground">India</p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:block"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when clicking the button
                        navigate(`/description/${job._id}`);
                    }}
                >
                    Apply Now
                </Button>
            </div>

            {/* Job Details */}
            <div className="mb-3">
                <h1 className="font-bold text-xl text-primary">{job?.title}</h1>
                <p className="text-sm text-muted-foreground line-clamp-3">{job?.description}</p>
            </div>

            {/* Footer Section with Badges */}
            <div className="flex items-center flex-wrap gap-3 mt-4">
                <Badge variant="secondary">{job?.position} Positions</Badge>
                <Badge variant="outline">{job?.jobType}</Badge>
                <Badge variant="destructive">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
