import React, { useEffect, useState } from 'react';
import MessageUserService from '../services/MessageUserService';

function ReceiveMessage({ user, selectedUser }) {
    const [messages, setMessages] = useState([]);  // State to store messages

    useEffect(() => {
        async function fetchMessages() {
            if (!selectedUser) return;

            try {
                const messagesData = await MessageUserService.getMessages(selectedUser, user);
                console.log("Fetched messages:", messagesData); // Debugging line
                setMessages(messagesData || []);  // Update the messages state with the fetched data
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }

        fetchMessages();
    }, [selectedUser, user]);

    return (
        <div className="message-list">
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} className="message-item">
                        <p>{message.body}</p>
                        <small>{message.sender_name}</small>
                    </div>
                ))
            ) : (
                <p>No messages yet...</p>
            )}
        </div>
    );
}

export default ReceiveMessage;
