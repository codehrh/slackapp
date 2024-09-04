import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChannelService from '../services/ChannelService';
import MessageUserService from '../services/MessageUserService';
import SendMessage from '../components/SendMessage';
import ReceiveMessage from '../components/ReceiveMessage';

export default function Messaging({ setIsLoggedIn, user }) {
    const { channelId } = useParams();
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
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
        if (!selectedChannel) return;

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
        setSelectedChannel(channel);
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
                onChannelSelect={handleChannelSelect}
                selectedChannel={selectedChannel}
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
                        receiverId={selectedChannel.id}
                        receiverClass="Channel"
                        onMessageSent={handleNewMessage}
                    />
                )}
            </main>
        </div>
    );
}