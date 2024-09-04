import React from 'react';
import { FaUser } from 'react-icons/fa';

function ReceiveMessage({ messages, user }) {
    // Check if user.uid is available (this is the email in your case)
    const userEmail = user?.uid?.trim().toLowerCase() || ''; // Use user.uid for the email

    console.log("Current User Email:", userEmail);

    return (
        <div className="messages-container">
            {messages.map((message, index) => {
                const senderEmail = message.sender?.email?.trim().toLowerCase() || 'unknown';
                const senderName = message.sender?.name || senderEmail;

                // Log the sender email and user email for debugging
                console.log(`Message ${index} - Sender Email: "${senderEmail}", User Email: "${userEmail}"`);

                // Compare sender's email to the current user's email
                const isSentByUser = senderEmail === userEmail;

                return (
                    <div 
                        key={index} 
                        className={`message ${isSentByUser ? 'sent' : 'received'}`}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                           
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '5px',
                            flexDirection: 'row',
                        }}>
                            <div 
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    backgroundColor: isSentByUser ? '#4a154b' : '#8A2BE2',  
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    margin: '5px',
                                }}
                            >
                                <FaUser />
                            </div>
                            <span style={{ fontSize: '0.8em', color: '#666' }}>
                                {isSentByUser ? 'You' : senderName}
                            </span>
                        </div>
                        <div 
                            className="message-content"
                            style={{
                                padding: '10px',
                                borderRadius: '10px',
                                maxWidth: '70%',
                                wordBreak: 'break-word',
                            }}
                        >
                            {message.body}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ReceiveMessage;
