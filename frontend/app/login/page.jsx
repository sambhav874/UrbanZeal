// Login.js
'use client'
import React from 'react';
import { useState } from 'react';
import { useSession , signIn , signOut } from 'next-auth/react';

const Login = () => {
    
 const [email , setEmail] = useState('');
 const [password , setPassword] = useState('');
const [loginInProgress , setLoginInProgress] = useState(false);


 async function handleFormSubmit(ev){
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn('credentials' , {email , password});
      setLoginInProgress(false);
 }
 
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" action="/api/auth"  method="POST" onSubmit={handleFormSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required value={email} disabled={loginInProgress} onChange={ev => setEmail(ev.target.value)}className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} disabled={loginInProgress} onChange={ev => setPassword(ev.target.value)}className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loginInProgress} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Log in
                        </button>
                    </div>
                </form>
                <button onClick={() => signIn('google')} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Log in with Google
                        </button>
            </div>
        </div>
    );
};

export default Login;
