import Link from 'next/link';
import '../src/app/globals.css';
import { signup } from '../service/apiService';
import { useRouter } from 'next/router';
import { useState } from 'react';
export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async(e: React.FormEvent, username: string, password: string)=>{
    e.preventDefault();
    try{
      const res = await signup(username, password);
      console.log(res);
      if(res?.status === 201){
        router.push('/login');
      }
    }catch(error){
      console.error('Signup failed:', error);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Signup</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            onClick={(e) => handleSignup(e, username, password)}
          >
            Signup
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-black bg-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:bg-gray-400"
          >
            <Link href='/'>
              Cancel
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}