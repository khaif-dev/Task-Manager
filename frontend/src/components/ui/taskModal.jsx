import React from 'react'
import { taskSchema } from '@/pages/schema'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTask, deleteTask, editTask, fetchTask, fetchTasks } from '@/lib/APIs/tasksAPI'
import {
  useFormField,
  Form,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'


const TaskModal = ({open, onClose}) => {

  const form = useForm({
    resolver:zodResolver(taskSchema),
    defaultValues:{
      title:"",
      dueDate:"2025-01-01",
      dueTime:"00:00",
      priority:"Medium",
      description:""
    }
  })

    const handleSubmit = async(value) =>{
        try {
            const newTask = await createTask(value);
            form.reset();
            onClose();
        } catch (error) {
            console.error("Error creating task:", error);                        
        }
    }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4 bg-white shadow-xl px-8 py-12 rounded-xl'>
                {/* task */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({field})=>
                    <FormItem>
                        <FormControl>
                        <Input 
                            {...field}
                            type='text'
                            placeholder="Task"
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

                <div className='flex w-full gap-4'>
                    {/* dueDate */}
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({field})=>
                        <FormItem className="flex-1">
                            <FormControl>
                            <Input
                                {...field}
                                type='date'
                                className="
                                border-2 
                                border-gray-400                              
                                focus-visible:ring-0
                                focus-visible:border-black
                                shadow-none
                            "
                            />
                            </FormControl>
                        </FormItem>
                        }
                    />
                    {/* dueTime */}
                    <FormField
                        control={form.control}
                        name="dueTime"
                        render={({field})=>
                        <FormItem className="flex-1">
                            <FormControl>
                            <Input
                                {...field}
                                type='time'
                                className="
                                border-2 
                                border-gray-400                              
                                focus-visible:ring-0
                                focus-visible:border-black
                                shadow-none
                            "
                            />
                            </FormControl>
                        </FormItem>
                        }
                    />
                </div>

                {/* priority */}
                <FormField
                    control={form.control}
                    name="priority"
                    render={({field})=>
                    <FormItem>
                        <Label>Priority</Label>
                        <FormControl>
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger
                                className="
                                border-2 
                                border-gray-400                              
                                focus-visible:ring-0
                                focus-visible:border-black
                                shadow-none
                            "
                            >
                            <SelectValue placeholder="Set priority" />
                            </SelectTrigger>                     
                            <SelectContent className='bg-white border-0 shadow-lg'>
                                <SelectItem 
                                value="Low"
                                className="hover:bg-blue-600 focus:bg-blue-600 focus:text-white hover:text-white">
                                    Low
                                </SelectItem>
                                <SelectItem 
                                    value="Medium"
                                    className="hover:bg-blue-600 focus:bg-blue-600 focus:text-white hover:text-white">
                                        Medium
                                </SelectItem>
                                <SelectItem 
                                    value="High"
                                    className="hover:bg-blue-600 focus:bg-blue-600 focus:text-white hover:text-white">
                                        High
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        </FormControl>
                    </FormItem>
                    }
                />

                {/* description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({field})=>
                    <FormItem>
                        <Label>Description</Label>
                        <FormControl>
                        <Textarea 
                            {...field}
                            className="
                                border-2 
                                border-gray-400                              
                                focus-visible:ring-0
                                focus-visible:border-black
                                shadow-none
                            "
                            placeholder='Task description'/>
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

export default TaskModal;
