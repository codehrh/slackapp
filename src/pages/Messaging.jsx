import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import MessageUserService from "../services/MessageUserService";
import SendMessage from '../components/SendMessage';
import ReceiveMessage from '../components/ReceiveMessage';

export default function Messaging({ user }) {
    const { channelId } = useParams();
    const [interactedUsers, setInteractedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Store user object
    const [messages, setMessages] = useState([]);

    // Fetch interacted users from the API
    const fetchInteractedUsers = useCallback(async () => {
        try {
            const users = await MessageUserService.getInteractedUsers(user);
            setInteractedUsers(users || []);
            setFilteredUsers([]);
        } catch (error) {
            console.error("Error fetching interacted users:", error);
        }
    }, [user]);

    // Fetch messages between the current user and the selected user
    const fetchMessages = useCallback(async () => {
        if (!selectedUser || !selectedUser.id) return;

        try {
            const messagesData = await MessageUserService.getMessages(selectedUser.id, user);
            setMessages(messagesData || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [selectedUser, user]);

    useEffect(() => {
        fetchInteractedUsers();
    }, [fetchInteractedUsers]);

    useEffect(() => {
        fetchMessages();
    }, [selectedUser, fetchMessages]);

    // Update filtered users based on search query
    useEffect(() => {
        if (searchQuery === "") {
            setFilteredUsers([]);
        } else {
            const filtered = interactedUsers.filter((user) =>
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, interactedUsers]);

    // Handle new message being sent
    const handleNewMessage = (messageInfo) => {
        setMessages((prevMessages) => [...prevMessages, messageInfo]);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div>
                    <h1>Messages</h1>
                    <div className="toggle-container">
                        <Link to="/home">
                            <button className="toggle-button">Channels</button>
                        </Link>
                        <Link to="/messaging">
                            <button className="toggle-button active">Messages</button>
                        </Link>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a user..."
                    />
                    {filteredUsers.length > 0 && searchQuery && (
                        <ul className="user-list">
                            {filteredUsers.map((user) => (
                                <li
                                    key={user.id}
                                    onClick={() => {
                                        setSelectedUser(user); // Store the entire user object
                                        setSearchQuery(user.email);
                                        setFilteredUsers([]);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {user.email}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <main className="main-content">
                <header className="message-header">
                    <h1>   To: {selectedUser ? selectedUser.email : "No user selected"}</h1>
                </header>

                {/* ReceiveMessage Component */}
                <ReceiveMessage messages={messages} user={user} />

                {/* SendMessage Component */}
                <SendMessage
                    user={user}
                    selectedUser={selectedUser ? selectedUser.id : null}
                    onMessageSent={handleNewMessage}
                />
            </main>
        </div>
    );
}
