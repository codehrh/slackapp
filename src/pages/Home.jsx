import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChannelMessages from '../components/ChannelMessages';
import ChannelService from '../services/ChannelService';

export default function Home({ user }) {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChannels();
  }, [user]);

  const fetchChannels = async () => {
    try {
      const channelsData = await ChannelService.getChannels(user);
      setChannels(channelsData);
    } catch (error) {
      setError('Failed to load channels');
    }
  };

  const handleChannelCreate = (newChannel) => {
    setChannels([...channels, newChannel]);
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  return (
    <div className="dashboard">
      <Sidebar 
        user={user} 
        channels={channels} 
        onChannelCreate={handleChannelCreate}
        onChannelSelect={handleChannelSelect}
        selectedChannel={selectedChannel}
      />
      <div className="main-content">
        {selectedChannel ? (
          <ChannelMessages channel={selectedChannel} user={user} />
        ) : (
          <div>Select a channel to view messages</div>
        )}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}