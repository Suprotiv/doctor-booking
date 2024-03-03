import React, { useEffect, useState } from 'react'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import { useAuth } from '../context/AuthContext';


const AppointmentModal = ({ isOpen, onClose, item ,like,setLike}) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const {user}=useAuth()

    const patientID=doc(db,'patient',`${user?.email}`)
    const docID=doc(db,'doctor',`${item?.email}`)
  
    const handleDateChange = (e) => {
      setDate(e.target.value);
    };
  
    const handleTimeChange = (e) => {
      setTime(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const patientData=(await getDoc(patientID)).data()
      await updateDoc(patientID, {
        listings: arrayUnion({
          email:item.email,
          name: item.name,
          description: item.description,
          field: item.field,
          status:'pending',
          date:date,
          time:time
        }),
      });
      await updateDoc(docID, {
        listings: arrayUnion({
          email:patientData.email,
          name: patientData.name,
          status:'pending',
          date:date,
          time:time
        }),
      });
      setLike(!like)

      alert("Appointment booked")
      onClose()
     
    };
  
    return (
      <>
      { isOpen ?
      <div className='flex w-full  items-center pt-4 px-12'>
        <div className='flex justify-between w-[25%]'>
          <div>
          <h2 className='text-white font-bold text-xl'>Enter Appointment Details</h2>
          <form onSubmit={handleSubmit} className='py-5 flex flex-col'>
            <label className="text-white py-2">Date:</label>
            <input  type="date" id="date" value={date} onChange={handleDateChange} required />
            <label className="text-white py-2">Time:</label>
            <input type="time" id="time" value={time} onChange={handleTimeChange} required />
            <button className='text-white font-bold bg-green-600 my-7 py-2' type="submit">Submit</button>
          </form>
          </div>
          <span className="text-white font-bold text-lg" onClick={onClose}>&times;</span>
        </div>
        </div>
        :null
        }
      </>
    );
  };

function Rows({items}) {

    const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
    const[like,setLike]=useState(false)
    const {user}=useAuth()

    const handleMakeAppointment = () => {
      setAppointmentModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setAppointmentModalOpen(false);
    };

    useEffect(() => {
      const fetchSavedShows = async () => {

        if (user?.email) {
          const docSnap = await getDoc(doc(db,'patient',`${user.email}`));
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const shows = userData.listings || []; 
           console.log("hello",shows)
            const isMovieLiked = shows.some((show) => show.email === items.email);
            setLike(isMovieLiked);
          }
        }
      };
  
      fetchSavedShows();
    }, []);
  
  return (
    <>
    <div className=' bg-gray-800 w-[90%] flex items-center cursor-pointer relative p-3 md:p-6 my-8 mx-3 gap-4 md:gap-8'>
       
       {
           appointmentModalOpen  ?
        <AppointmentModal isOpen={appointmentModalOpen} onClose={handleCloseModal} item={items} like={like} setLike={setLike}/>
        :
        <>
        <img src='' className=' h-[90px] md:h-[100px] w-[90px] md:w-[100px]'/>
        <div>
        <h1 className='text-white py-2 text-xl md:text-3xl font-bold'>{items?.name}</h1>
        <p className='text-white py-2'>description : {items?.description}</p>
        <p className='text-white py-2'>field : {items?.field}</p> 
        {!like ?
        <button onClick={handleMakeAppointment} className='bg-green-600 p-2 text-sm md:text-lg my-2 rounded text-white font-bold hover:bg-green-800'>Make an appointment</button>
        :
        <button  className='bg-green-800 p-2 text-sm md:text-lg my-2 rounded text-white font-bold'>Appointemnt Scheduled</button>
        }
        </div>
        </>
        }

       
    </div>
    </>
  )
}

export default Rows