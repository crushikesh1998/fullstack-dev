"use client";
import { ChangeEvent, FormEvent ,useState } from "react";
import { supabase } from "@/config/dbConfig";
export default function User(){
    const [isSignup,setIsSignUp] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const handleSubmit =async(e : FormEvent<HTMLElement>)=>{
        e.preventDefault();
        if(isSignup){
            // Handle signup logic here
            const{} =await supabase.auth.signUp({email,password})
            
            console.log("Signing up:", user);
        } else {
            // Handle login logic here
            console.log("Logging in:", user);
        }

    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <h1 className="text-2xl font-bold mb-4">User Page</h1>
            <p className="text-gray-100">Welcome to the user page!</p>
            
            <form onSubmit={handleSubmit} className=" px-10 bg-gray-300 rounded-2xl py-14  flex items-center justify-between flex-col gap-2 max-w-md">
                <div>
                <label className="block" > name : </label>
                <input type="text" 
                    className=" border border-solid outline-none px-2 py-1.5 rounded "
                    value={user.name}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setUser(() => ({ ...user, name: e.target.value }))}
                    />
                </div>
                
                <div>       
                <label className="block"> email : </label>
                <input type="email"  className=" border border-solid outline-none px-2 py-1.5 rounded"
                    value={user.email}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setUser(() => ({ ...user, email: e.target.value }))}                
                />
                </div> 

                <div>       
                <label className="block"> password : </label>
                <input type="password"  className=" border border-solid outline-none px-2 py-1.5 rounded"
                    value={user.password}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setUser(() => ({ ...user, password: e.target.value }))}
                />
                </div>     
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {isSignup ? "Sign Up" : "Login"}
                        </button>

            </form>
        </div>
    );
}