"use client";
import React, { useState } from "react";

export default function signupPage(){
    const [user , setUser] = useState({
        email:'',
        password:'',
    })
    const login = async () =>{}
    return(
        <div className="min-h-screen py-2 flex flex-col items-center justify-center bg-black ">
            <section className="h-9/12 w-1/3 bg-amber-100 py-6 px-5 rounded ">
                <h1 className="text-2xl  font-semibold text-center">Login</h1>
                <form className="flex flex-col gap-4 mt-5" onSubmit={login}>
                    <input type="email" placeholder="Email" className="p-2 rounded" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                    <input type="password" placeholder="Password" className="p-2 rounded" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">Login</button>
                </form>
            </section>
        </div>
    )
}