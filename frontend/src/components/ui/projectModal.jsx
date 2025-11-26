import React from 'react'
import { projectSchema } from '@/pages/schema'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createProject } from '@/lib/APIs/projectAPI'
import {
  useFormField,
  Form,
  FormItem,
  FormControl,
  FormField,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { fetchProjects } from '@/lib/APIs/projectAPI'
import { useState } from 'react'

const ProjectModal = ({open, onClose}) => {
  const [projects, setProjects] = useState([]);

  const form = useForm({
    resolver:zodResolver(projectSchema),
    defaultValues:{
      name:"Project",
    }
  });

    const handleSubmit = async(value) =>{
        try {
            const newProject = await createProject(value);
            form.reset();
            onClose();
        } catch (error) {
            console.error("Error creating project:", error);                        
        }
    }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className=' flex flex-col gap-4 bg-white shadow-xl px-8 py-12 rounded-xl'>
                {/* project */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>
                    <FormItem>
                        <FormControl>
                        <Input 
                            {...field}
                            type='text'
                            placeholder="project"
                            className="
                                border-0 
                                border-b-2 
                                border-gray-400 
                                rounded-none 
                                focus-visible:ring-0
                                focus-visible:border-black
                                shadow-none
                            "

                        />
                        </FormControl>
                    </FormItem>
                    }
                />

                <Button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white'>Save</Button>
            </form>
        </Form>
      
    </div>
  )
}

export default ProjectModal;

