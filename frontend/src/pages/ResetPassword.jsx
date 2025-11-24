import React from 'react'
import { resetPasswordSchema } from './schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod";


const Login = () => {
    // zod updates the form automatically
    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
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

                <Button className='bg-blue-600 hoover:bg-blue-700'>Reset Password</Button>              
            </form>
        </Form>
      
    </div>
    )
}

export default Login
