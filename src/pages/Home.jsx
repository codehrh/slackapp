import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import ChannelService from '../services/ChannelService';

export default function Home({ user }) {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [newChannelName, setNewChannelName] = useState('');
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const channelsData = await ChannelService.getChannels(user);
        setChannels(channelsData);
      } catch (error) {
        setError('Failed to load channels');
      }
    }

    fetchChannels();
  }, [user]);

  const handleCreateChannel = async (event) => {
    event.preventDefault();
    if (!newChannelName) {
      setError('Channel name is required');
      return;
    }

    try {
      const newChannel = await ChannelService.createChannel(user, { name: newChannelName });
      setChannels([...channels, newChannel]);
      setNewChannelName('');
      setShowCreateChannel(false);
    } catch (error) {
      setError('Failed to create channel. Please try again.');
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h1>Channels</h1>
        <button onClick={() => setShowCreateChannel(!showCreateChannel)}>
          <FontAwesomeIcon icon={faPlus} className='icon' /> Create New Channel
        </button>
        {showCreateChannel && (
          <form onSubmit={handleCreateChannel}>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="Channel Name"
            />
            <button type="submit">Create</button>
          </form>
        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {channels.length > 0 ? (
          channels.map((channel) => (
            <div key={channel.id} className="channel-item">
              <span>{channel.name}</span>
              <button>
                <FontAwesomeIcon icon={faEdit} className='icon' /> Go to Channel
              </button>
            </div>
          ))
        ) : (
          <div>No channels available</div>
        )}
      </div>
      <div className="main-content">
        <div className="messages-container">
          <div className="message">Message 1</div>
          <div className="message">Message 2</div>
        </div>
        <div className="message-input-container">
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}