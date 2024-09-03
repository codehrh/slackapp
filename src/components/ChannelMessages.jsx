import React, { useState, useEffect } from 'react';
import ChannelService from '../services/ChannelService';

export default function ChannelMessages({ channel, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, [channel]);

  const fetchMessages = async () => {
    try {
      // Assume ChannelService has a getMessages method
      const messagesData = await ChannelService.getMessages(user, channel.id);
      setMessages(messagesData);
    } catch (error) {
      setError('Failed to load messages');
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Assume ChannelService has a sendMessage method
      const sentMessage = await ChannelService.sendMessage(user, channel.id, newMessage);
      setMessages([...messages, sentMessage]);
      setNewMessage('');
    } catch (error) {
      setError('Failed to send message');
    }
  };

  return (
    <div className="messages-container">
      <h2>Messages for {channel.name}</h2>
      <div className="messages-list">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-input-container">
        <input s
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..." 
        />
        <button type="submit">Send</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}