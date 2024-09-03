import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function ChannelList({ channels }) {
  return (
    <div className="channel-list">
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
  );
}