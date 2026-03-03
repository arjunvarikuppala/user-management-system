import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

function User() {
    let { id } = useParams()
    let navigate = useNavigate()
    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    
    async function fetchUser() {
        try {
            let res = await fetch(`http://localhost:3000/user-api/users/${id}`)
            let data = await res.json()
            if (res.ok) {
                setUser(data.payload)
            } else {
                setError(data.message || "User not found")
            }
        } catch (err) {
            setError("Failed to fetch user",err)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchUser()
    }, [id])
    
    async function handleDelete() {
        try {
            let res = await fetch(`http://localhost:3000/user-api/users/${id}`, {
                method: "DELETE"
            })
            if (res.ok) {
                navigate("/userlist")
            }
        } catch (err) {
            console.log("Error deleting user:", err)
        }
    }
    
    if (loading) {
        return <p className="text-center text-xl">Loading...</p>
    }
    
    if (error) {
        return <p className="text-center text-red-500 text-xl">{error}</p>
    }
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <div className="border p-4 shadow-lg">
                <p className="mb-2"><strong>Name:</strong> {user.name}</p>
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="mb-2"><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
                <p className="mb-2"><strong>Mobile Number:</strong> {user.mobilenumber}</p>
            </div>
            <button 
                onClick={handleDelete}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Delete User
            </button>
            <button 
                onClick={() => navigate("/userlist")}
                className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
                Back to List
            </button>
        </div>
    )
}

export default User

