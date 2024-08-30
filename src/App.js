import './App.css';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
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
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    setIsLoggedIn(!!userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setUser={updateUser} setIsLoggedIn={setIsLoggedIn}/>, 
    },
    {
      path: "/dashboard",
      element: <Dashboard user={user} setUser={updateUser} setIsLoggedIn={setIsLoggedIn}/>, 
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
