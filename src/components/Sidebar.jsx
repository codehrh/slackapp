import React from 'react';
import ChannelList from './Channels';
import ChannelCreation from './ChannelCreation';

export default function Sidebar({ user, channels, onChannelCreate, onChannelSelect, selectedChannel }) {
  return (
    <div className="sidebar">
      <h1>Channels</h1>
      <ChannelCreation user={user} onChannelCreate={onChannelCreate} />
      <ChannelList 
        channels={channels} 
        onChannelSelect={onChannelSelect}
        selectedChannel={selectedChannel}
      />
    </div>
  );
}