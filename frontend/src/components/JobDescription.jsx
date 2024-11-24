import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(
        (application) => application.applicant === user?._id
    );
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to apply');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some(
                            (application) => application.applicant === user?._id
                        )
                    );
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='bg-muted/40 h-screen'>

        <div className="max-w-5xl mx-auto  p-4 ">
            <Card className=" mt-10">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">{singleJob?.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary">{singleJob?.position} Positions</Badge>
                                <Badge variant="outline">{singleJob?.jobType}</Badge>
                                <Badge variant="destructive">{singleJob?.salary} LPA</Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            variant={isApplied ? 'outline' : 'default'}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Role</h3>
                            <p className="text-md">{singleJob?.title}</p>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Location</h3>
                            <p className="text-md">{singleJob?.location}</p>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Description</h3>
                            <p className="text-md">{singleJob?.description}</p>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Experience</h3>
                            <p className="text-md">{singleJob?.experience} years</p>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Salary</h3>
                            <p className="text-md">{singleJob?.salary} LPA</p>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Applicants</h3>
                            <p className="text-md">{singleJob?.applications?.length}</p>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Posted Date</h3>
                            <p className="text-md">
                                {singleJob?.createdAt?.split('T')[0] || 'N/A'}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        </div>
    );
};

export default JobDescription;
