import Link from 'next/link';
import '../src/app/globals.css';
import {login} from "../service/apiService";
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';


export default function Login() {
  const loginContext = useAuth().login;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent, username: string, password: string, loginContext: any) => {
    event.preventDefault();
    try {
      const res = await login( username, password, loginContext);
      if (res?.status === 302) {  
        loginContext(res.data);
        router.push('/dashboard');
    }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
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
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
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
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            onClick={(event) => handleSubmit(event, username,password, loginContext)}
          >
            Login
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