import React, { useState } from 'react';
import MessageUserService from '../services/MessageUserService';

function SendMessage({ user, selectedUser, onMessageSent }) {
    const [newMessage, setNewMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        // Ensure the selected user and new message are not empty or undefined
        if (!selectedUser || !newMessage) {
            console.error('Selected user or message is missing');
            return;
        }

        const messageInfo = {
            receiver_id: selectedUser,
            receiver_class: selectedUser ? "User" : "Channel",
            body: newMessage,
        };

        try {
            await MessageUserService.sendMessage(user, messageInfo);
            setNewMessage(""); // Clear the input after sending
            onMessageSent(messageInfo); // Immediately show the new message
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <footer className="message-input">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </footer>
    );
}

export default SendMessage;
