import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChannelService from '../services/ChannelService';
import MessageUserService from '../services/MessageUserService';
import SendMessage from '../components/SendMessage';
import ReceiveMessage from '../components/ReceiveMessage';

export default function Messaging({ setIsLoggedIn, user }) {
    const { channelId } = useParams(); // Grab channelId from the URL
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null); // Replace selectedUser with selectedChannel
    const [messages, setMessages] = useState([]);

    // Fetch channels from the API
    const fetchChannels = useCallback(async () => {
        try {
            const fetchedChannels = await ChannelService.getChannels(user);
            setChannels(fetchedChannels || []);
        } catch (error) {
            console.error("Error fetching channels:", error);
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
        console.log("Selected channel:", channel); // Log the selected channel
        setSelectedChannel(channel);  // Set the selected channel instead of user
        console.log("Selected channel ID:", channel.id);  // Log the selected channel ID
    };

    // Handle new message being sent
    const handleNewMessage = (messageInfo) => {
        setMessages((prevMessages) => [...prevMessages, messageInfo]);
    };

    return (
        <div className="dashboard">
            <Sidebar
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                channels={channels}
                onChannelCreate={handleChannelCreate}
                onChannelSelect={handleChannelSelect} // Handle channel selection
                selectedChannel={selectedChannel} // Pass the selected channel
            />
            <main className="main-content">
                <header className="message-header">
                    <h1>{selectedChannel ? selectedChannel.name : "No channel selected"}</h1>
                </header>

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
        </div>
    );
}
