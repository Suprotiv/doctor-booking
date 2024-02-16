import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from '../Firebase'
import Rows from '../components/Rows'

function Home() {
  const {user}=useAuth()
  const[doctors,setDoctors]=useState([])
  const[name,setName]=useState()
  const[type,setType]=useState()
  const[description,setDescription]=useState()
  const[field,setField]=useState()
    
  useEffect(()=>{
    const fetchDoctors = async () => {
      try {
        const doctorCollectionRef = collection(db, 'doctor');
        const querySnapshot = await getDocs(doctorCollectionRef);
        const doctorsData = [];

        // Iterate through the documents in the collection
        querySnapshot.forEach((doc) => {
          // Extract the data from each document and push it to the array
          doctorsData.push({ id: doc.id, ...doc.data() });
        });
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Error fetching doctors: ', error);
      }
    };
    
    // Call the function to fetch doctors
    fetchDoctors();
  },[])
  console.log(doctors)

  return (
    <div>
      <Navbar/>
      {
        doctors.map((item)=>(
         <Rows items={item}/>
        ))
      }
    </div>
  )
}

export default Home