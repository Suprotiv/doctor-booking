import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Firebase'

function Login() {
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const {user,login}=useAuth()
    const navigate=useNavigate()
    const [error,setError]=useState(); 

    const submitlogin=(async (e)=>{
        e.preventDefault()

        try{
            await login(email,password)
            const doctorCollectionRef = collection(db, 'doctor');
            const querySnapshot = await getDocs(doctorCollectionRef);

            const doctorsData = [];

            // Iterate through the documents in the collection
            querySnapshot.forEach((doc) => {
              // Extract the data from each document and push it to the array
              doctorsData.push({ id: doc.id, ...doc.data() });
            });
            const isDoctor = doctorsData.some((show) => show.email === email);

            if(isDoctor)
            {
              navigate('/account/doctor')
            }
            else{
              navigate('/home')
            }



           
        }
        catch(error)
        {
          setError(error)
        }
    })

  return (
    <>
     <div className='fixed bg-neutral-200  top-0 left-0 w-full h-screen'></div>
    <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/100 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold flex justify-center my-3'>Login</h1>
              {
                    error ?<p className='bg-red-900 text-white p-3 rounded'>{(error?.message).slice(9,)}</p>:null
              }
          <form className='w-full flex flex-col  py-4' onSubmit={submitlogin}>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} type='password'></input>
            <button className='bg-blue-400 py-4 my-4 rounded text-lg' >Log in</button>
            <div className='flex justify-between'>
            <p className='flex items-center'><input type='checkbox' className='mr-2'></input> 
            <p className='text-sm'>Remember me </p>
            </p>
            <p className='text-sm'>Need Help ?</p>
            </div>
            <p className='text-md my-10 mx-8'><span className='text-gray-600 mx-2'>New to our website ?</span><Link to='/signup'>Sign up</Link></p>
          </form>
            
          
        </div>
        </div>
        </div>
    
    </>
  )
}

export default Login