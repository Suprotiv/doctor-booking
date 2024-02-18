import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './screens/Main';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { AuthContextProvider } from './context/AuthContext';
import ProtextedRoute from './components/ProtextedRoute';
import Home from './screens/Home';
import Account from './screens/Account';
import AccountDoc from './screens/AccountDoc';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <div><ProtextedRoute><Home/></ProtextedRoute></div>,
  },
  {
    path: "/login",
    element: <div><Login/></div>,
  },
  {
    path: "/signup",
    element: <div><Signup/></div>,
  },
  {
    path: "/",
    element: <div><Main/></div>,
  },
  {
    path: "/account",
    element: <div><Account/></div>,
  },
  {
    path: "/account/doctor",
    element: <div><AccountDoc/></div>,
  },
 
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
   <RouterProvider router={router} />
   </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
