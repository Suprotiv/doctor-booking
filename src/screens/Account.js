import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import Savedbookings from '../components/Savedbookings'

function Account() {

  const[bookings,setBookings]=useState([])
  const{user}=useAuth()
  const[option,setOption]=useState('confirmed')

  useEffect(()=>{

    const FectchListings=(async()=>{

      if(user)
    {
      const data= (await getDoc(doc(db,'patient',`${user?.email}`)))

      if(data.exists())
      {
        const data1=(data.data()).listings || []
        console.log(data1)
        let data2=[]
        if(data1.length!==0)
        {
          
          data2=data1.filter((item)=> item.status===option)
          
        }
        console.log(data2)
        setBookings(data2)
      }


    }

    })
    FectchListings()

  },[user?.email,option])

  return (
    <div><Navbar/>
        <div className='flex justify-center items-center gap-6 py-6'>
          <p className='text-gray-400 font-bold text-lg md:text-3xl hover:cursor-pointer' onClick={()=>setOption('pending')}>Pending</p>
          <p className='text-gray-400 font-bold text-lg md:text-3xl hover:cursor-pointer' onClick={()=>setOption('confirmed')} >Confirmed</p>
          <p className='text-gray-400 font-bold text-lg md:text-3xl hover:cursor-pointer' onClick={()=>setOption('rejected')} >Rejected</p>
        </div>
        <div>
          {
            (bookings.length!==0)?
           bookings.map((item)=>(
            <Savedbookings items={item}/>
           ))
           :
           <p className='text-5xl font-bold text-gray-300 flex justify-center items-center h-[60vh]'>Nothing to Show !</p>
          }
        </div>

    </div>
  )
}

export default Account