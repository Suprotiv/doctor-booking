import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase'

function Signup() {

    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[cpassword,setCPassword]=useState()
    const[name,setName]=useState()
    const[type,setType]=useState()
    const[description,setDescription]=useState()
    const[field,setField]=useState()
    const[error,setError]=useState()
    const navigate=useNavigate()

    const{user,signup}=useAuth()

    const submitlogin=(async(e)=>{
        e.preventDefault()
       if(password===cpassword)
       {
        try{
            await signup(email,password)
            if(type==='doctor'){
            setDoc(doc(db,'doctor', email), {
                   name:name,
                   description:description,
                   field:field
            })
        }
        else
        {
            setDoc(doc(db,'patient', email), {
              name:name,
                listings:[]

        })
        }
            navigate('/home')

        }
        catch(error)
        {
            setError(error)

        }
       }
       else{
        setError({message:'Firebase: Error : Password doesnt match !'})
       }
    })

  return (
    <>
    <div className='fixed bg-neutral-200  top-0 left-0 w-full h-screen'></div>
    <div className='fixed w-full px-4 py-16 z-50'>
          <div className='max-w-[450px] h-[700px] mx-auto bg-black/100 text-white'>
            <div className='max-w-[320px] mx-auto py-8'>
              <h1 className='text-3xl font-bold flex justify-center my-1'>Sign Up</h1>
              {
                    error ?<p className='bg-red-900 text-white p-3 rounded'>{(error?.message).slice(9,)}</p>:null
              }
          <form className='w-full flex flex-col  py-4' onSubmit={submitlogin}>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter Name'  onChange={(e)=>setName(e.target.value)} ></input>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} type='password'></input>
            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Confirm password' value={cpassword} onChange={(e)=>setCPassword(e.target.value)} type='password'></input>
           
           
            <select className='bg-gray-600 py-2 my-2 px-2' onChange={(e)=>setType(e.target.value)}>
                <option value="patient">patient</option>
                <option value="doctor">doctor</option>
             </select>

             {
              type==='doctor' ?
              <>
              <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter description'  onChange={(e)=>setDescription(e.target.value)}></input>
              <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter field'  onChange={(e)=>setField(e.target.value)} ></input>
              </>
              :null
             }


            <button className='bg-blue-400 py-4 my-4 text-lg rounded' >Sign up</button>
            <div className='flex justify-between'>
            <p className='flex items-center'><input type='checkbox' className='mr-2'></input> 
            <p className='text-sm'>Remember me </p>
            </p>
            <p className='text-sm'>Need Help ?</p>
            </div>
            <p className='text-md my-10 mx-8'><span className='text-gray-600 mx-2'>Already have an account ?</span><Link to='/login'>Log in</Link></p>
          </form>
            
          
        </div>
        </div>
        </div>

  </>
  )
}

export default Signup