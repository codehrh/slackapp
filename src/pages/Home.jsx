import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChannelService from '../services/ChannelService';
import MessageUserService from '../services/MessageUserService';
import SendMessage from '../components/SendMessage';
import ReceiveMessage from '../components/ReceiveMessage';
import AddUsersToChannel from '../components/AddUsersToChannel'; // Import AddUsersToChannel component

export default function Home({ setIsLoggedIn, user }) {
    const { channelId } = useParams(); // Grab channelId from the URL
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null); // Added error state

    // Fetch channels from the API
    const fetchChannels = useCallback(async () => {
        try {
            const fetchedChannels = await ChannelService.getChannels(user);
            setChannels(fetchedChannels || []);
        } catch (error) {
            console.error("Error fetching channels:", error);
            setError('Failed to load channels');
        }
    }, [user]);

    // Fetch messages for the selected channel
    const fetchMessages = useCallback(async () => {
        if (!selectedChannel) return; // Only fetch messages if a channel is selected

        try {
            const messagesData = await MessageUserService.getMessages(selectedChannel.id, user, 'Channel');
            setMessages(messagesData || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [selectedChannel, user]);

    useEffect(() => {
        fetchChannels();
    }, [fetchChannels]);

    useEffect(() => {
        fetchMessages();
    }, [selectedChannel, fetchMessages]);

    // Handle new channel creation
    const handleChannelCreate = (newChannel) => {
        setChannels((prevChannels) => [...prevChannels, newChannel]);
    };

    // Handle channel selection
    const handleChannelSelect = (channel) => {
        console.log("Selected channel:", channel);
        setSelectedChannel(channel);
        console.log("Selected channel ID:", channel.id);
    };

    // Handle new message being sent
    const handleNewMessage = (messageInfo) => {
        setMessages((prevMessages) => [...prevMessages, messageInfo]);
    };

    // Handle user added to channel
    const handleUserAdded = () => {
        fetchChannels(); // Refresh the channels list
    };

    return (
        <div className="dashboard">
            <Sidebar
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                channels={channels}
                onChannelCreate={handleChannelCreate}
                onChannelSelect={handleChannelSelect}
                selectedChannel={selectedChannel}
            />
            <main className="main-content">
                <header className="message-header">
                    <h1>{selectedChannel ? selectedChannel.name : "No channel selected"}</h1>
                </header>

                {/* AddUsersToChannel Component */}
                {selectedChannel && (
                    <AddUsersToChannel 
                        channel={selectedChannel} 
                        user={user} 
                        onUserAdded={handleUserAdded}
                    />
                )}

                {/* ReceiveMessage Component */}
                <ReceiveMessage messages={messages} user={user} />

                {/* SendMessage Component */}
                {selectedChannel && (
                    <SendMessage 
                        user={user}
                        selectedChannel={selectedChannel}
                        receiverClass="Channel" 
                        onMessageSent={handleNewMessage}
                    />
                )}
            </main>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
        </div>
    );
}