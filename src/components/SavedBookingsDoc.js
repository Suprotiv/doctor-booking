import { useAuth } from '../context/AuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase'

function SavedBookingsDoc({items}) {

    const{user}=useAuth()

    const docID=(doc(db,'doctor',`${user?.email}`))
    const patientID=(doc(db,'patient',`${items.email}`))

    const confirm =(async (e)=>{
        
      if(user)
      {
        const docData= (await getDoc(docID))
        const patientData= await getDoc(patientID)
  
        if(docData.exists())
        {
          const data1=(docData.data()).listings || []

          const data1_2=data1.filter((val)=> val?.email===items?.email)

          data1_2[0].status='confirmed'

          console.log(data1_2[0])
          const data2=(patientData.data()).listings || []
          const data2_2=data2.filter((val)=> val?.email===user?.email)

          data2_2[0].status='confirmed'
          console.log(data2_2[0])

          const doctorIndexToUpdate = data1.findIndex(val => val.email === items.email);
          const patientIndexToUpdate = data2.findIndex(val => val.email === user.email);
  
          data1[doctorIndexToUpdate]=data1_2[0]
          data2[patientIndexToUpdate]=data2_2[0]
  
          await updateDoc(docID, { listings: data1 });
          await updateDoc(patientID, { listings: data2 });

          
        }
  
  
      }
      window.location.reload();
    })

    const reject =(async (e)=>{
        
        if(user)
        {
          const docData= (await getDoc(docID))
          const patientData= await getDoc(patientID)
    
          if(docData.exists())
          {
            const data1=(docData.data()).listings || []
  
            const data1_2=data1.filter((val)=> val?.email===items?.email)
  
            data1_2[0].status='rejected'
  
            console.log(data1_2[0])
            const data2=(patientData.data()).listings || []
            const data2_2=data2.filter((val)=> val?.email===user?.email)
  
            data2_2[0].status='rejected'
            console.log(data2_2[0])
  
            const doctorIndexToUpdate = data1.findIndex(val => val.email === items.email);
            const patientIndexToUpdate = data2.findIndex(val => val.email === user.email);
    
            data1[doctorIndexToUpdate]=data1_2[0]
            data2[patientIndexToUpdate]=data2_2[0]
    
            await updateDoc(docID, { listings: data1 });
            await updateDoc(patientID, { listings: data2 });
  
            
          }
    
    
        }
        window.location.reload();
      })

  return (
    <>
        <div className=' bg-gray-800 w-[90%] flex items-center cursor-pointer relative p-3 md:p-6 my-8 mx-3 gap-4 md:gap-8'>
    <img src='logo192.png' className=' h-[90px] md:h-[100px] w-[90px] md:w-[100px]' alt=''/>
    <div>
    <h1 className='text-white py-2 text-xl md:text-3xl font-bold'>{items?.email}</h1>
    <p className='text-white py-2'>date : {items?.date}</p>
    <p className='text-white py-2'>time : {items?.time}</p> 
   
    <p className='text-white py-2 my-2' >Status : {items?.status}</p>   
    <div className='flex  gap-3 md:gap-5'>
        <button className='bg-gray-300 p-2 text-lg font-bold rounded' onClick={confirm}>Confirm</button>
        <button className='bg-gray-300 p-2 text-lg font-bold rounded' onClick={reject}>Reject</button>
    </div>
    </div>
</div>
</>
  )
}

export default SavedBookingsDoc