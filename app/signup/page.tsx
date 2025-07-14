"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function Singup() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup success", response.data);
            router.push("/login")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex justify-center items-center min-h-screen flex-col w-full">
            <h1>{loading ? "processing" : "Sign up"}</h1>
            <form className='flex flex-col w-1/3'>
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="border p-2 mb-2 rounded outline-none"
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="border p-2 mb-2"
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="border p-2 mb-2"
                />
                <button type="submit" onClick={onSignup} className="bg-blue-500 text-white p-2">{buttonDisabled ? "no signup" : " signup"}</button>
            </form>
            <p className="mt-4">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>

        </div>
    )
}