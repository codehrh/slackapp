import React from 'react';
import Channels from './Channels';
import {Link } from "react-router-dom";
import ChannelCreation from './ChannelCreation';

export default function Sidebar({ user, channels, onChannelCreate, onChannelSelect, selectedChannel }) {
  return (
    <div className="sidebar">
      <div>
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
    </div>
  );
}