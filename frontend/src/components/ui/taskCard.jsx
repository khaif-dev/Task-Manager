import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskSchema } from '@/pages/schema'
import { Card, CardContent } from "./card";
import { Toggle } from "@/components/ui/toggle"
import { Trash2, SquarePen ,EllipsisVertical, Calendar, Clock4, Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { editTask, deleteTask } from '@/lib/APIs/tasksAPI';


const TaskCard = ({ task, refresh }) => {
    const [edit, setEdit] = useState(false)
    const [draft, setDraft] = useState(task)

    // Guard against undefined task
    if (!task) {
        return <div className='text-gray-500'>No task data</div>;
    }

    const form = useForm({
        resolver:zodResolver(taskSchema),
        defaultValues:{
            title:task.title || "",
            dueDate:task.dueDate || "",
            dueTime:task.dueTime || "",
            priority:task.priority || "Low",
            description:task.description || ""
        }
    });

    const priorityColors = {
        Low: "bg-green-200 text-green-800",
        Medium: "bg-yellow-200 text-yellow-800",
        High: "bg-orange-300 text-orange-900",
    };


    const handleUpdate = async(values) => {
        try {
           await editTask(task._id, values);
           setEdit(false);
           refresh();
        } catch (error) {
            console.error("Unable to Edit", error);
        }
    }

    const handleDelete = async() => {
        await deleteTask(task._id);
        refresh();
    };

    const handleStatusToggle = async () => {
        const newStatus = task.status === "Completed" ? "Active" : "Completed";
        try {
            await editTask(task._id, { status: newStatus });
            refresh(); 
        } catch (error) {
            console.error("Unable to update status", error);
        }
    };

    const changeImportance = async (isImportant) => {
    try {
        const newImportance = await editTask(task._id, { importance: isImportant });
        console.log(newImportance)
        refresh(); 
    } catch (error) {
        console.error("Unable to update importance", error);
    }
    };

  return (
    <div>
        {edit?(
            // edit mode
            <Form {...form}> 
                <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className="flex flex-col gap-4 border-1 border-black/70 rounded-lg p-6"
                >
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input {...field} placeholder="Task title" />
                        </FormControl>
                    </FormItem>
                    )}
                />

                {/* Date & Time */}
                <div className="flex gap-4">
                    <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                        <FormControl>
                            <Input {...field} type="date" />
                        </FormControl>
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="dueTime"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                        <FormControl>
                            <Input {...field} type="time" />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                </div>

                {/* Priority */}
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                        </FormControl>
                    </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Textarea {...field} placeholder="Description" />
                        </FormControl>
                    </FormItem>
                    )}
                />

                {/* Buttons */}
                <div className="flex gap-4 justify-end">
                    <Button
                    variant="outline"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => setEdit(false)}
                    >
                    Cancel
                    </Button>

                    <Button 
                    type='submit'
                    className="bg-green-600 hover:bg-green-700 text-white">
                    Save
                    </Button>
                </div>
                </form>
          </Form>

        ):(
            // view mode
            <Card>
                <CardContent className=' flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        {/* Checkbox + Title */}
                        <div className="flex items-center gap-2">
                            <Checkbox checked={task.status === "Completed"}
                                onCheckedChange={handleStatusToggle}
                            />
                            <p 
                                className={`text-lg font-semibold ${
                                task.status === "Completed" ? "line-through text-gray-500" : ""
                            }`}
                            >{task.title}</p>
                        </div>
                        {/* priority + edit */}
                        <div className='flex'>
                            <Badge className={priorityColors[task.priority]}>
                                {task.priority}
                            </Badge>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                   <Button className='border-0 focus:border-0'>
                                        <EllipsisVertical />
                                    </Button> 
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='bg-white border-0'>
                                    <DropdownMenuItem onClick={() => setEdit(true)}>
                                        <SquarePen className="w-4 h-4 mr-2" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete}>
                                        <Trash2 className="w-4 h-4 mr-2 text-red-600" />  
                                        <span className="text-red-600">Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>                            
                        </div>
                    </div>
                    {/* due  */}
                    <div className='flex justify-between'>
                        <div className='flex gap-4 px-6 items-center text-sm'>
                            <Calendar size={15}/>: {task.dueDate}
                            <Clock4 size={15}/>: {task.dueTime}
                        </div>
                        <div>
                            <Toggle
                                aria-label="Toggle bookmark"
                                size="lg"
                                pressed={task.importance}
                                onPressedChange={changeImportance}
                                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
                                >
                                <Star size={36} />
                            </Toggle>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
        
      
    </div>
  )
}

export default TaskCard
