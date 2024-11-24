import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, PenBox } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useLoaderData } from 'react-router-dom';

const Profile = () => {
    // Load user data from the loader
    const { user } = useLoaderData();
    
    // Local state for opening/closing dialog
    const [open, setOpen] = useState(false);

    return (
        <div className=''>
            {/* Navbar */}
            <Navbar />

            {/* User Profile Section */}
            <div className="max-w-4xl mx-auto border rounded my-5 p-8 ">
                <div className="flex justify-between">
                    {/* User Avatar and Info */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname || "NA"}</h1>
                            <p>{user?.profile?.bio || "Bio not provided"}</p>
                        </div>
                    </div>
                    {/* Edit Button */}
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                       <PenBox/>
                    </Button>
                </div>

                {/* Contact Information */}
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail className='w-5 h-5 ' />
                        <span>{user?.email || "NA"}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact className='w-5 h-5 ' />
                        <span>{user?.phoneNumber || "NA"}</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="my-5">
                    <h1 className="text-lg font-bold">Skills</h1>
                    <div className="flex items-center gap-1">
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {user?.profile?.resume ? (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={user.profile.resume}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            {user.profile.resumeOriginalName || "View Resume"}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto rounded-2xl">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
