import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function UserList() {
    let [users, setUsers] = useState([])
    let navigate = useNavigate()
    
    async function fetchUsers() {
        try {
            let res = await fetch("http://localhost:3000/user-api/users")
            let data = await res.json()
            if (res.ok) {
                setUsers(data.payload)
            }
        } catch (err) {
            console.log("Error fetching users:", err)
        }
    }
    
    useEffect(() => {
        fetchUsers()
    }, [])
    
    function handleUserClick(userId) {
        // Navigate to User component with user ID
        navigate(`/user/${userId}`)
    }
    
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-4">Users List</h1>
            <div className="flex flex-col gap-2 p-4">
                {users.map(user => (
                    <div 
                        key={user._id} 
                        onClick={() => handleUserClick(user._id)}
                        className="border p-4 cursor-pointer hover:bg-gray-100 shadow-md"
                    >
                        <p className="font-semibold">Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                ))}
            </div>
            {users.length === 0 && <p className="text-center text-gray-500">No users found</p>}
        </div>
    )
}

export default UserList

