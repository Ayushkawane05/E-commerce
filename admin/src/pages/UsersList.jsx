import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const UsersList = ({ token }) => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/all-users', { headers: { token } })
      if (response.data.success) {
        setUsers(response.data.users)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [token])

  if (loading) {
    return <div className='flex justify-center items-center h-[60vh] text-gray-500'>Loading customer directory...</div>
  }

  return (
    <div className='p-4 sm:p-8'>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-2xl font-bold text-gray-700'>Registered Users</p>
        <p className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium'>
          Total Customers: {users.length}
        </p>
      </div>

      <div className='flex flex-col gap-2'>
        {/* ------- List Table Header ---------- */}
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_3fr_1.5fr] items-center py-3 px-4 border bg-gray-50 text-sm font-bold text-gray-600'>
          <p>S.No</p>
          <p>Name</p>
          <p>Email Address</p>
          <p>User ID</p>
        </div>

        {/* ------- User List ---------- */}
        {users.length > 0 ? (
          users.map((item, index) => (
            <div 
              key={item._id} 
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_3fr_1.5fr] items-center gap-2 py-3 px-4 border text-sm text-gray-700 hover:bg-blue-50 transition-all rounded-md md:rounded-none'
            >
              <p className='font-medium'>{index + 1}</p>
              <div className='flex flex-col'>
                 <p className='font-bold md:font-normal'>{item.name}</p>
                 <p className='md:hidden text-xs text-gray-400'>{item.email}</p>
              </div>
              <p className='hidden md:block'>{item.email}</p>
              <p className='text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded w-fit'>
                {item._id}
              </p>
            </div>
          ))
        ) : (
          <p className='text-center py-10 text-gray-400'>No users registered yet.</p>
        )}
      </div>
    </div>
  )
}

export default UsersList