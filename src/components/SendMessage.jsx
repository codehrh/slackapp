import React, { useState } from 'react';
import MessageUserService from '../services/MessageUserService';

function SendMessage({ user, selectedUser, selectedChannel, receiverClass, onMessageSent }) {
    const [newMessage, setNewMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        // Log selectedUser and selectedChannel for debugging
        console.log("Selected user:", selectedUser);
        console.log("Selected channel:", selectedChannel);

        // Ensure the selected user/channel and new message are not empty or undefined
        if ((!selectedUser && !selectedChannel) || !newMessage) {
            console.error('Selected user/channel or message is missing');
            return;
        }

        const receiverId = typeof selectedUser === 'number' ? selectedUser : selectedChannel ? selectedChannel.id : null;


        // Log receiverId for debugging
        console.log("Receiver ID:", receiverId);

        if (!receiverId) {
            console.error('Receiver ID is missing');
            return;
        }

        const messageInfo = {
            receiver_id: receiverId,  // Use receiverId from above
            receiver_class: selectedUser ? 'User' : 'Channel',
            body: newMessage,
        };

        console.log("Sending message:", messageInfo); // Log the message being sent

        try {
            const response = await MessageUserService.sendMessage(user, messageInfo);
            console.log("Message sent successfully:", response); // Log the API response
            setNewMessage(""); // Clear the input after sending
            onMessageSent(messageInfo); // Immediately show the new message
        } catch (error) {
            console.error('Error sending message:', error); // Log the error
        }
    }

    return (
        <div className="message-input">
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
        </div>
    );
}

export default SendMessage;
