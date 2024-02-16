import React from 'react'

function Rows({items}) {
  return (
    <>
    <div className=' bg-gray-800 w-[90%]  inline-block cursor-pointer relative p-6 my-8 mx-3'>
        <div>
        <h1 className='text-white py-2'>Name : {items?.name}</h1>
        <p className='text-white py-2'>description : {items?.description}</p>
        <p className='text-white py-2'>field : {items?.field}</p>
        </div>
    </div>
    </>
  )
}

export default Rows