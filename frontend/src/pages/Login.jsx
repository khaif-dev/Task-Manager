import React from 'react'
import { loginSchema } from './schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod";


const Login = () => {
    // zod updates the form automatically
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email:'',
            password:''
        },
    });

  return (
    <div>
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                {/* email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="janedoe@example.com"
                                    {...field}                                    
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    }
                />

                {/* password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter password'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    }
                />  

                <Button className='bg-blue-600 hoover:bg-blue-700'>Sign In</Button>              
            </form>
        </Form>
      
    </div>
    )
}

export default Login
