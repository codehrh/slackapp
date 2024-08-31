import React, { useState } from 'react';
import MessageUserService from '../services/MessageUserService'; 

function SendMessage({ user, selectedUser, onMessageSent }) {
    const [newMessage, setNewMessage] = useState("");  // State to store the new message input

    async function handleSubmit(event) {
        event.preventDefault();
        const messageInfo = {
            receiver_id: selectedUser,
            receiver_class: selectedUser ? "User" : "Channel",
            body: newMessage,
        };

        try {
            await MessageUserService.sendMessage(user, messageInfo);
            console.log("Message sent:", messageInfo); // Debugging line
            setNewMessage("");  // Clear the input after sending
            onMessageSent();  // Trigger the callback to refresh the message list
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
