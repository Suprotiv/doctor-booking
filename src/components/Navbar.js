import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Navbar() {
    const{user,logout}=useAuth()
    const navigate=useNavigate()

    const logoutuser=(async ()=>{
        try{
            await logout();
            navigate('/signup')
            
        }
        catch(error)
        {
            console.log(error)
        }
    })
  return (
    <div className='bg-black w-full h-[50px] py-3 px-4 md:px-8 flex justify-between'>
        <h1 className='text-white font-bold '>App-Name</h1>
        <div className='flex gap-4 md:gap-8'>
            {user ? <>
                    <Link to='/account' className='hover:cursor-pointer' >
                    <p className='text-white'>account</p>
                    </Link>
                    <p className='text-white hover:cursor-pointer' onClick={logoutuser}>logout</p>
                     </>:
                     <>
                     <Link to='/sigup'>
                     <p className='text-white'>Sign up</p>
                     </Link>
                     <Link to='/login'>
                     <p className='text-white'>Log in</p>
                     </Link>
                     </>
            }   
        </div>
        </div>
  )
}

export default Navbar