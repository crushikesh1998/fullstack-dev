"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
export default  function LoginPage(){
    const[user, setUser] = React.useState({

        email: "",
        password: ""
    });
    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {}

        return (
        <div className="flex justify-center items-center min-h-screen flex-col w-full">
            <h1>Login</h1>
            <form className='flex flex-col w-1/3'>

                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={user.email} 
                    onChange={(e) => setUser({...user, email: e.target.value})} 
                    className="border p-2 mb-2"
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={user.password} 
                    onChange={(e) => setUser({...user, password: e.target.value})} 
                    className="border p-2 mb-2"
                />
                <button type="submit" onClick={onLogin} className="bg-blue-500 text-white p-2">Login</button>
            </form>
            <p className="mt-4">Don't have an account? <Link href="/signup" className="text-blue-500">Signup</Link></p>

        </div>
    )
}