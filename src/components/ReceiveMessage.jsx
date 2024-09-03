import React from 'react';
import { FaUser } from 'react-icons/fa';

function ReceiveMessage({ messages, user }) {
    return (
        <div className="messages-container">
            {messages.map((message, index) => {
                const senderEmail = message.sender_email || ''; 
                const userEmail = user?.email || '';

                // Safely check if the sender's email matches the user's email
                const isSentByUser = senderEmail && userEmail && senderEmail.toLowerCase() === userEmail.toLowerCase();

                return (
                    <div 
                        key={index} 
                        className={`message ${isSentByUser ? 'sent' : 'received'}`}
                        style={{
                            display: 'flex',
                            justifyContent: isSentByUser ? 'flex-end' : 'flex-start',
                            marginBottom: '10px',
                        }}
                    >
                        {!isSentByUser && (
                            <div 
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#8A2BE2',  
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    marginRight: '10px',
                                }}
                            >
                                <FaUser />
                            </div>
                        )}
                        <div 
                            className="message-content"
                            style={{
                                padding: '10px',
                                borderRadius: '10px',
                                textAlign: isSentByUser ? 'right' : 'left',
                            }}
                        >
                            {/* Show the email of the message sender */}
                            <strong>{isSentByUser ? 'You' : senderEmail}</strong>
                            <div>{message.body}</div>
                        </div>
                        {isSentByUser && (
                            <div 
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#1E90FF',  // Blue for sent messages
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    marginLeft: '10px',
                                }}
                            >
                                <FaUser />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ReceiveMessage;
