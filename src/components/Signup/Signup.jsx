import React, { useContext } from 'react';
import { Authcontext } from '../../context/AuthContext';

const Signup = () => {
    const { createUser ,signInwihGoogle} = useContext(Authcontext);

    const saveUserToDb=(name,email)=>{
        const userData={
            email:email,
            name: name
            
        }
        fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(userData)
        })
         .then(res=>res.json())
         .then(data=>{
            console.log('after saved',data)
            console.log(data.inserted)
         })
    }
    const handleCreateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                saveUserToDb(name,email)
            })
            .catch(error => {
                console.log(error.message)
            })
    };
 const handlesignUpwithGoogle=()=>{
    signInwihGoogle()
     .then(result=>{
        console.log(result.user)
        console.log(result)
        const user = result.user
        const name = user.displayName
        const email = user.email
        saveUserToDb(name, email)
     })
     .catch(err=>{
        console.log(err.message)
     })
 }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleCreateUser} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? Login
                </p>
                {/* Google */}
                <button
                onClick={handlesignUpwithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>

            </div>
        </div>
    );
};

export default Signup;