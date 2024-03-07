import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore';
import { TypeAnimation } from 'react-type-animation';
import { db } from '../Firebase';



function Main() {

  const{user}=useAuth()

  const navigate=useNavigate()

  const onsubmit=async()=>{
    const doctorCollectionRef = collection(db, 'doctor');
    const querySnapshot = await getDocs(doctorCollectionRef);

    const doctorsData = [];

    // Iterate through the documents in the collection
    querySnapshot.forEach((doc) => {
      // Extract the data from each document and push it to the array
      doctorsData.push({ id: doc.id, ...doc.data() });
    });
    const isDoctor = doctorsData.some((show) => show.email === user?.email);

    if(isDoctor)
    {
      navigate('/account/doctor')
    }
    else{
      navigate('/home')
    }
  }

 console.log(user)
  return (
    <div className='flex justify-center items-center'>
     <div className='mt-[25vh]'>
     { user ?
      <div> 
      <h1 className='text-6xl md:text-9xl font-bold'>Welcome to </h1>
      <h1 className='text-6xl md:text-9xl font-bold mb-10'>app-name</h1>
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Your health, our priority',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Putting your health first',
        1000,
        'Expert care, just a click away',
        1000,
        'Navigate your health journey.',
        1000
      ]}
      wrapper="span"
      speed={50}
      className='text-5xl'
      repeat={Infinity}
    />
       <div className='bg-blue-800 text-white font-bold text-5xl rounded-lg p-4  hover:cursor-pointer' onClick={onsubmit}>Get started </div>
      </div>
     
      :
      <div> 
      <h1 className='text-6xl md:text-9xl font-bold'>Welcome to </h1>
      <h1 className='text-6xl md:text-9xl font-bold mb-10'>app-name</h1>
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Your health, our priority',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Putting your health first',
        1000,
        'Expert care, just a click away',
        1000,
        'Navigate your health journey.',
        1000
      ]}
      wrapper="span"
      speed={50}
      className='text-xl md:text-5xl'
      repeat={Infinity}
    />
      <Link to='/signup'>
      <p className='bg-blue-800 flex justify-center text-white font-bold text-3xl md:text-5xl rounded-lg p-4 mt-9 md:mt-12 hover:cursor-pointer'>Get Started</p>
      </Link>
      </div>
      }
      </div>
    </div>
  )
}

export default Main