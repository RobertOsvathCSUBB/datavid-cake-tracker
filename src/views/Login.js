import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        try {
            console.log(email, password);
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in successfully!");
            console.log(auth?.currentUser?.email);
            navigate("/home");
        }
        catch (err) {
            console.log(err);
            window.alert("Error signing in!" + err);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to access Datavid Cake Tracker</h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={signIn}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-2">
                        <input id="password" name="password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Login;