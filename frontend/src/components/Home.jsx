import React from 'react'
import { Link } from 'react-router'

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Welcome to User Management App</h1>
            <div className="flex gap-4">
                <Link 
                    to="/adduser" 
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Add User
                </Link>
                <Link 
                    to="/userlist" 
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                >
                    View Users
                </Link>
            </div>
        </div>
    )
}

export default Home

