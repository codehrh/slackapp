
import './App.css';

//unused imports

// import { useEffect, useState } from 'react';
// import { API_URL } from './constants/Constants';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faKey , faUserPlus} from '@fortawesome/free-solid-svg-icons'
// import SignUp from './pages/SignUp';

//page imports
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

//react router imports
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([

  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/Dashboard",
    element: <Dashboard/>,
    // children: [
    //   {
    //     index: true,
    //   }
    // ]
  },

])

export default function App() {
  

  return (
    <div className="App">
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
}
