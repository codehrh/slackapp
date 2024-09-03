import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ChannelService from '../services/ChannelService';

export default function ChannelCreation({ user, onChannelCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [error, setError] = useState(null);

  const handleCreateChannel = async (event) => {
    event.preventDefault();
    if (!newChannelName) {
      setError('Channel name is required');
      return;
    }

    try {
      const newChannel = await ChannelService.createChannel(user, { name: newChannelName });
      onChannelCreate(newChannel);
      setNewChannelName('');
      setShowForm(false);
      setError(null);
    } catch (error) {
      setError('Failed to create channel. Please try again.');
    }
  };

  return (
    <div className="channel-creation">
      <button onClick={() => setShowForm(!showForm)}>
        <FontAwesomeIcon icon={faPlus} className='icon' /> Create New Channel
      </button>
      {showForm && (
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
    </div>
  );
}
