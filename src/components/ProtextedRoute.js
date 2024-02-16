import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function ProtextedRoute({children}) {

    const{user}=useAuth()
    const navigate=useNavigate()
  
    
    if(!user)
    {
        navigate('/')
    }
    else
    {
        return children
    }

  
}

export default ProtextedRoute