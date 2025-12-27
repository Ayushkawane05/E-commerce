import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4'>
            <div className='bg-white shadow-2xl rounded-3xl px-10 py-8 w-full max-w-md animate-fadeIn'>

                <h1 className='text-4xl font-bold mb-6 text-center text-gray-800'>Admin Panel</h1>

                <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-lg w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            type="email"
                            placeholder='your@email.com'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-lg w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            type="password"
                            placeholder='Enter your password'
                            required
                        />
                    </div>

                    <button
                        className='mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg'
                        type="submit"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Login
