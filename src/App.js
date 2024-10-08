import './App.css';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import Messaging from './pages/Messaging';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ChannelCreation from './pages/ChannelCreation';
import Channels from './pages/Channels';
import PageNotFound from './pages/PageNotFound';

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
      errorElement: <PageNotFound/>
    },
    {
      path: "/home",
      element: <Home user={user} setUser={updateUser} setIsLoggedIn={setIsLoggedIn}/>,
      errorElement: <PageNotFound/>
    },
    {
      path: "/messaging",
      element: <Messaging user={user} setIsLoggedIn={setIsLoggedIn}/>
    },
    {
      path: "/channels",
      element: <Channels user={user} setIsLoggedIn={setIsLoggedIn}/>
    },
    {
      path: "/create-channel",
      element: <ChannelCreation user={user} />,
      errorElement: <PageNotFound/>
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
