import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Channels({ channels, onChannelSelect, selectedChannel }) {
    return (
      <div className="channel-list">
        {channels.length > 0 ? (
          channels.map((channel) => (
            <div onClick={() => onChannelSelect(channel)} key={channel.id} className="channel-item">
              <span>{channel.name}</span>
            </div>
          ))
        ) : (
          <div>No channels available</div>
        )}
      </div>
    );
  }