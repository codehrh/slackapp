import React from 'react';
import { useNavigate } from "react-router-dom";
import Channels from './Channels';
import {Link } from "react-router-dom";
import ChannelCreation from './ChannelCreation';

export default function Sidebar({setIsLoggedIn, user, channels, onChannelCreate, onChannelSelect, selectedChannel }) {
  const navigate = useNavigate();

  function logout() {
    console.log("Logging out");
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");  // Redirect to the homepage or login page after logout
}

  return (
    <div className="sidebar">
      
      <div className='sidebar-content'>
      <h1>Channels</h1>
      <div className="toggle-container">
                        <Link to="/home">
                            <button className="toggle-button active">Channels</button>
                        </Link>
                        <Link to="/messaging">
                            <button className="toggle-button">Messages</button>
                        </Link>
                    </div>
      <ChannelCreation user={user} onChannelCreate={onChannelCreate} />
      <Channels 
        channels={channels} 
        onChannelSelect={onChannelSelect}
        selectedChannel={selectedChannel}
      />
       

      </div>
      <button className="logout" onClick={logout}>Log Out</button>
    </div>
  );
}