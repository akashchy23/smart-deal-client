import React, { use } from 'react';
import { Authcontext } from '../../context/AuthContext';

const Login = () => {
     const {signInuser}= use(Authcontext)
    const handleLogin = (e) => {
       
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInuser(email,password)
         .then(result=>{
            console.log(result.user)
         })
        .catch(err=>{
            console.log(err.message)
        })
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;