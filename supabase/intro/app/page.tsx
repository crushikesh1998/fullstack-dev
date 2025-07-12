"use client";
import { useState,FormEvent } from "react";
import { supabase } from "@/config/dbConfig";

interface Task {
  id?: number;
  title: string;
  description: string;
  created_at?: string;
}

export default function Home() {
const[newTask,setNewTask] =useState({
    title :"",
    description :""
  });
  // State to hold the list of tasks
const[tasks,setTasks] = useState<Task[]>([]);
const[newDescription,setNewDescription] =useState("")

// Fetch tasks from the database when the component mounts
const fetchTasks = async () => {
    const { data, error } = await supabase.from("task").select("*").order("created_at", { ascending: true });
    
    
    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      console.log("Fetched tasks:", data);
    }
    setTasks(data || []);
  };

  const deleteTask = async(id:number) =>{

    const {error } =await supabase.from("task").delete().eq("id",id)

    if (error){
      console.log("Error deleting task :",error.message);
      return;
    }
  }

  const updateTask = async(id:number) =>{

    const {error } =await supabase.from("task").update({description : newDescription}).eq("id",id)

    if (error){
      console.log("Error updating task : ",error.message);
      return;
    }
  }

  // useEffect to fetch tasks when the component mounts
  useState(() => {
    fetchTasks();
  });

  // Function to handle form submission
const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const {error} = await supabase.from("task").insert(newTask).single();

    if(error){
      console.log("Error adding task : ",error.message);
    }
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col bg-gray-400 overflow-hidden ">
      <div className="w-1/3 py-10 px-20 bg-white rounded-lg">
        <h1 className="text-lg font-medium capitalize text-gray-500 text-center ">task manager crud</h1>
        <form className="flex flex-col m-3 gap-2 "  onSubmit={handleSubmit}>
        <input type="text" 
        className="border-gray-300 border-1 outline-none px-2 py-1 rounded"
        onChange={(e) => setNewTask((prev) =>({...prev, title :e.target.value}))}
        placeholder="title" />

        <textarea name="description" 
        id="desc" 
        placeholder="description" 
        className="border-gray-300 border-1 outline-none px-2 py-1 rounded"
        onChange={(e) => setNewTask((prev) =>({...prev, description :e.target.value}))}
        />
        <button 
        className="bg-blue-300 px-4 py-3 text-white text-md font-medium cursor-pointer">Add task</button>
        </form>

      </div>
      {
        tasks.map((task ) => (
        <section className="bg-white mt-5 w-1/3 rounded px-3 py-3 flex flex-col gap-2 shrink-0"
        key={task.id}
        >
        <span>Title :{task.title}</span>
        <span>Description :{task.description} </span>
        <div className="flex justify-end items-center mt-2 gap-3">
          < textarea  onChange={(e) =>setNewDescription(e.target.value)}/>
          <button className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"onClick={() => updateTask(task.id!)}>Edit</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer" onClick={() => deleteTask(task.id!)}>delete</button>
        </div>
      </section>
        ))
      }
    </div>
  );
}
