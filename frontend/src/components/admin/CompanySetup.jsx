import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import useGetCompanyById from '@/hooks/useGetCompanyById';

// Zod schema
const companySchema = z.object({
    name: z.string().min(5,'Company name is required'),
    description: z.string().min(5,'Description is required'),
    website: z.string().url(10,'Invalid website URL').optional(),
    location: z.string().min(5,'Location is required'),
    file: z.instanceof(File).optional(),
});

const CompanySetup = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { singleCompany } = useSelector((store) => store.company);

    useGetCompanyById(id);

    const form = useForm({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: '',
            description: '',
            website: '',
            location: '',
            file: null,
        },
    });

    const { setValue } = form;

    useEffect(() => {
        if (singleCompany) {
            setValue('name', singleCompany.name || '');
            setValue('description', singleCompany.description || '');
            setValue('website', singleCompany.website || '');
            setValue('location', singleCompany.location || '');
            setValue('file', singleCompany.logo || '');
        }
    }, [singleCompany, setValue]);

    const submitHandler = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'file' && value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value);
                }
            });

            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)}>
                        <div className="flex items-center gap-5 p-8">
                            <Button
                                onClick={() => navigate('/admin/companies')}
                                variant="outline"
                                className="flex items-center gap-2 text-gray-500 font-semibold"
                            >
                                <ArrowLeft />
                                Back
                            </Button>
                            <h1 className="font-bold text-xl">Company Setup</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter company name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter website URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Logo</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full my-4"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CompanySetup;
