import './App.css';
import { useState } from 'react';

// page imports
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

// react router imports
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const router = createBrowserRouter([

  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },

])

export default function App() {
  const [user, setUser] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>, // Pass setUser to Login to update user state
    },
    {
      path: "/dashboard",
      element: <Dashboard user={user} setIsLoggedIn={setIsLoggedIn}/>, // Pass user data to Dashboard
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
