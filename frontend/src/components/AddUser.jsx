import React from 'react'
    import { useState } from 'react'
    import { useForm } from 'react-hook-form'
    import { useNavigate } from 'react-router'

function AddUser() {
        let { handleSubmit, register } = useForm()
        let navigate = useNavigate()
        let [error, setError] = useState(null)
        let [loading, setLoading] = useState(false)
        async function userUpdate(props) {
            setLoading(true)
            try {
                // Map dateOfBirth to DOB to match backend schema
                let userData = {
                    name: props.name,
                    email: props.email,
                    DOB: props.dateOfBirth,
                    mobilenumber: props.mobilenumber
                }
                
                let res = await fetch("http://localhost:3000/user-api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })
                let data = await res.json()
                
                if (res.ok) {
                    navigate("/userlist")
                }
                else{
                    // Show the error message from backend
                    throw new Error(data.message || "failed to fetch");
                }
            }
            catch(err){
                setError(err.message)
            }
            finally{
                setLoading(false)
            }
        }
        if(loading===true){
            return <p className='text-4xl text-red-500' >loading...</p>
        }
        else if(error!==null){
            return <p className='text-4xl text-red-500' >{error}</p>
        }
        return (
            <div>
                <form onSubmit={handleSubmit(userUpdate)} >
                    <div className='flex flex-col gap-4 p-10 items-center shadow-2xl '>
                        <input type="text" {...register('name')} placeholder='enter user' className=' border w-80 p-2 ' />
                        <input type="email" {...register('email')} placeholder='enter email' className=' border w-80 p-2 ' />
                        <input type="date" {...register('dateOfBirth')} className='ml-2.5 border w-80 p-2' />
                        <input type="number" {...register('mobilenumber')} placeholder='enter mobile number' className='ml-2.5 border w-80 p-2' />
                        <button className='cursor-pointer bg-amber-600 w-20 ' >save</button>
                    </div>
                </form>
            </div>
        )
    }

    export default AddUser