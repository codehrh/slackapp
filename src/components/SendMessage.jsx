import React, { useState } from 'react';
import MessageUserService from '../services/MessageUserService'; 

function SendMessage({ user }) {
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const info = {
            receiver_id: Number(receiver),
            receiver_class: "User",
            body: message,
        };
        try {
            await MessageUserService.sendMessage(user, info);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Send to:</label>
                <input 
                    type="number" 
                    value={receiver}
                    onChange={(event) => setReceiver(event.target.value)} 
                    required
                />
                <label>Message:</label>
                <input 
                    type="text" 
                    value={message}
                    onChange={(event) => setMessage(event.target.value)} 
                    required
                />
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default SendMessage;
