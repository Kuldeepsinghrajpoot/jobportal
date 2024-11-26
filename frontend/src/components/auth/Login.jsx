import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

// Zod schema
const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['student', 'recruiter'], 'Role is required'),
})

const Login = () => {
    const { loading, user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            role: 'student',
        },
    })

    const { handleSubmit, control, setValue, watch, formState: { errors } } = form
    const role = watch('role')

    const submitHandler = async (data) => {
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'An error occurred')
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <Form {...form}>
                    <form onSubmit={handleSubmit(submitHandler)} className="w-1/2 p-4 my-10">
                        <h1 className="font-bold text-xl mb-5">Login</h1>

                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="deepansh@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <RadioGroup
                                        value={role}
                                        onValueChange={(value) => setValue('role', value)}
                                        className="flex items-center gap-4 my-5"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="student" id="student" />
                                            <Label htmlFor="student">Student</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="recruiter" id="recruiter" />
                                            <Label htmlFor="recruiter">Recruiter</Label>
                                        </div>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Login
                            </Button>
                        )}
                        <span className="text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary">
                                Signup
                            </Link>
                        </span>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login
