import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const doctorCollectionRef = collection(db, 'doctor');
      const querySnapshot = await getDocs(doctorCollectionRef);
      const doctorsData = [];

      querySnapshot.forEach((doc) => {
        doctorsData.push({ id: doc.id, ...doc.data() });
      });

      const isDoctor = doctorsData.some((doctor) => doctor.email === user?.email);
      setIsDoctor(isDoctor);
    };

    fetchData();
  }, [user]); // Trigger effect whenever user changes

  const logoutUser = async () => {
    try {
      await logout();
      navigate('/signup');
    } catch (error) {
      console.log(error);
    }
  };

  // Return the component only if isDoctor is updated
  return (
    <div className='bg-black w-full h-[50px] py-3 px-4 md:px-8 flex justify-between'>
        <h1 className='text-white font-bold hover:cursor-pointer'>App-Name</h1>
      <div className='flex gap-4 md:gap-8'>
        {user ? (
          !isDoctor ? (
            <div className='flex gap-4 md:gap-8'>
              <Link to='/account' className='hover:cursor-pointer'>
                <p className='text-white'>Account</p>
              </Link>
              <p className='text-white hover:cursor-pointer' onClick={logoutUser}>
                logout
              </p>
            </div>
          ) : (
            <div>
              <p className='text-white hover:cursor-pointer' onClick={logoutUser}>
                logout
              </p>
            </div>
          )
        ) : (
          <>
            <Link to='/signup'>
              <p className='text-white'>Sign up</p>
            </Link>
            <Link to='/login'>
              <p className='text-white'>Log in</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
