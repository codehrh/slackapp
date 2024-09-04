import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Channels({ channels, onChannelSelect, selectedChannel }) {
    return (
      <div className="channel-list">
        {channels.length > 0 ? (
          channels.map((channel) => (
            <div key={channel.id} className="channel-item">
              <span>{channel.name}</span>
              <button onClick={() => onChannelSelect(channel)}>
                <FontAwesomeIcon icon={faEdit} className='icon' /> 
                {selectedChannel && selectedChannel.id === channel.id ? 'Selected' : 'Go to Channel'}
              </button>
            </div>
          ))
        ) : (
          <div>No channels available</div>
        )}
      </div>
    );
  }