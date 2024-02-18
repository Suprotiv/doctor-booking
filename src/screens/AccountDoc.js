import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import Navbar from '../components/Navbar'
import Savedbookings from '../components/Savedbookings'
import SavedBookingsDoc from '../components/SavedBookingsDoc'

function AccountDoc() {

    const[bookings,setBookings]=useState([])
    const{user}=useAuth()
    const[option,setOption]=useState('pending')

  useEffect(()=>{

    const FectchListings=(async()=>{

    try{
      if(user)
    {
      const data= await getDoc(doc(db,'doctor',`${user?.email}`))

      if(data.exists())
      {
        const data1=(data.data()).listings || []
       
        let data2=[]
        if(data1.length!==0)
        {
          
          data2=data1.filter((item)=> item.status===option)
          
        }
        console.log(data2)
        setBookings(data2)

        {
            (bookings.length!==0)?
          bookings.map((item)=>(
           <SavedBookingsDoc items={item}/>
          ))
          :
          <p className='text-5xl font-bold text-gray-300 flex justify-center items-center h-[60vh]'>Nothing to Show !</p>
         }
      }


      

      
    }
        }
        catch(error)
        {
            console.log(error)
        }


    })

    FectchListings()

  },[user?.email,option])



    return (
        <div>
            <Navbar/>
            <div className='flex justify-center items-center gap-6 py-6'>
              <p className='text-gray-400 font-bold text-2xl md:text-3xl hover:cursor-pointer' onClick={()=>setOption('pending')}>pending</p>
              <p className='text-gray-400 font-bold text-2xl md:text-3xl hover:cursor-pointer' onClick={()=>setOption('confirmed')} >confirmed</p>
              <p className='text-gray-400 font-bold text-2xl md:text-3xl hover:cursor-pointer' onClick={()=>setOption('rejected')} >rejected</p>
            </div>
            <div>
            {
             (bookings.length!==0)?
           bookings.map((item)=>(
            <SavedBookingsDoc items={item}/>
           ))
           :
           <p className='text-5xl font-bold text-gray-300 flex justify-center items-center h-[60vh]'>Nothing to Show !</p>
          }
            </div>
    
        </div>
      )
}

export default AccountDoc