"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);

    const [error , setError]  = useState(false);


    async function handleFormSubmit(ev) {
         ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'},
      });

    if (response.ok) {
        setUserCreated(true);
      }
      else {
        setError(true);
      }
      setCreatingUser(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
                </div>
                {userCreated && (
                    <div className="my-8 text-center text-black">
                        User created.<br /> Now you can {' '}
                        <Link className='underline' href={'/login'}>&raquo;</Link>
                    </div>
                )}
                {error && (
                    <div className="my-8 text-center text-black">
                        An error has occured.<br /> Please try again later .
                        <Link className='underline' href={'/login'}>&raquo;</Link>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleFormSubmit} method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" value={email} disabled={creatingUser} onChange={ev => setEmail(ev.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" disabled={creatingUser} value={password} onChange={ev => setPassword(ev.target.value)} autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button disabled={creatingUser} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
                <button onClick={() => signIn('google')} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Log in with Google
                </button>
                <div className='text-center border-t pt-4 my-4 text-black' >Existing Account?{' '} <Link className='underline' href={'/login'}>Login Here &raque;</Link></div>
            </div>
            
        </div>
    );
};

export default Register;
