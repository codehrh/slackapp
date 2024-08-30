import './App.css';
import { useState } from 'react';
// page imports
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
// react router imports
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
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
=======

function App() {
>>>>>>> e04cf52b91d0a18e1348cabd0a6e4b8e462fcddb
  const [user, setUser] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>, 
    },
    {
      path: "/dashboard",
      element: <Dashboard user={user} setIsLoggedIn={setIsLoggedIn}/>, 
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
<<<<<<< HEAD
}
=======
}

export default App;
>>>>>>> e04cf52b91d0a18e1348cabd0a6e4b8e462fcddb
