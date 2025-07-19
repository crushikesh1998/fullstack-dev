/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);



    const onLogin = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/login", user);
            console.log("login success", response.data);
            // Redirect to home or dashboard after successful login
            toast.success("Login Success!")
            router.push("/profile");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Login failed:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex justify-center items-center min-h-screen flex-col w-full">
            <h1>{loading ? "processing" : "Login"}</h1>
            <form className='flex flex-col w-1/3'>

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
                <button type="submit" onClick={onLogin} className="bg-blue-500 text-white p-2">{buttonDisabled ? "no Login" : " Login"}</button>
            </form>
            <p className="mt-4">Don't have an account? <Link href="/signup" className="text-blue-500">Signup</Link></p>

        </div>
    )
}