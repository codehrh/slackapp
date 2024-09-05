import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MessageUserService from "../services/MessageUserService";
import SendMessage from '../components/SendMessage';
import ReceiveMessage from '../components/ReceiveMessage';

export default function Messaging({ setIsLoggedIn, user }) {
    const { channelId } = useParams();
    const [interactedUsers, setInteractedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const navigate = useNavigate();

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
            setShowResults(false);
        } else {
            const filtered = interactedUsers.filter((user) =>
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
            setShowResults(true);
        }
    }, [searchQuery, interactedUsers]);

    function logout() {
        console.log("Logging out");
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
    }

    // Handle new message being sent
    const handleNewMessage = (messageInfo) => {
        setMessages((prevMessages) => [...prevMessages, messageInfo]);
    };

    // Handle user selection
    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setSearchQuery("");
        setShowResults(false);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="sidebar-content">
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
                        className="sidebar-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowResults(true)}
                        placeholder="Search for a user..."
                    />
                    {showResults && filteredUsers.length > 0 && (
                        <ul className="user-list">
                            {filteredUsers.map((user) => (
                                <li
                                    key={user.id}
                                    onClick={() => handleUserSelect(user)}
                                    style={{ cursor: 'pointer', padding: '1%' }}
                                >
                                    {user.email}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="logout" onClick={logout}>Log Out</button>
            </div>
            <main className="main-content">
                <header className="message-header">
                    <h1>To: {selectedUser ? selectedUser.email : "No user selected"}</h1>
                </header>

                <ReceiveMessage messages={messages} user={user} />

                <SendMessage
                    user={user}
                    selectedUser={selectedUser ? selectedUser.id : null}
                    onMessageSent={handleNewMessage}
                />
            </main>
        </div>
    );
}