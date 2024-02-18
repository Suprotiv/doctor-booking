import React from 'react'

function Savedbookings({items}) {
  return (
    <>
    <div className=' bg-gray-800 w-[90%] flex items-center cursor-pointer relative p-3 md:p-6 my-8 mx-3 gap-4 md:gap-8'>
        <img src='logo192.png' className=' h-[90px] md:h-[100px] w-[90px] md:w-[100px]'/>
        <div>
        <h1 className='text-white py-2 text-xl md:text-3xl font-bold'>{items?.name}</h1>
        <p className='text-white py-2'>description : {items?.description}</p>
        <p className='text-white py-2'>field : {items?.field}</p> 
       
        <p className='text-white py-2' >Status : {items?.status}</p>
        </div>
    </div>
    </>
  )
}

export default Savedbookings