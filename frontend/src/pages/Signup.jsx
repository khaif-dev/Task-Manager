import React from 'react'
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signupSchema } from './schema';
import { zodResolver } from "@hookform/resolvers/zod";



const Signup = () => {
    // // Controls the form state manually using the onChange on the input field
    // const [form, setForm] = useState({
    //     email:"",
    //     password:""
    // })

    const handleSubmit = () => {
        
    }
    
    // zod updates the form automatically
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues:{
            email:'',
            password:'',
            confirmPassword:''
        },
    });

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=> (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="janedoe@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* password */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    }
                />

                {/* confirm password */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Confirm Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    }
                />

                <Button className='bg-blue-600 hover:bg-blue-700'>Sign Up</Button>
            </form>

        </Form>
    </div>
  )
}

export default Signup
