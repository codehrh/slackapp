import React from 'react';
import ChannelList from './Channels';
import ChannelCreation from './ChannelCreation';

export default function Sidebar({ user, channels, onChannelCreate, onChannelSelect, selectedChannel }) {
  return (
    <div className="sidebar">
      <div>
        <button>Channels</button>
        <button>Messages</button>
        <h1>Channels</h1>
        <ChannelCreation user={user} onChannelCreate={onChannelCreate} />
        <ChannelList
          channels={channels}
          onChannelSelect={onChannelSelect}
          selectedChannel={selectedChannel}
        />
      </div>
    </div>
  );
}