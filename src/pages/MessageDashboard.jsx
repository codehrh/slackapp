import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import MessageUserService from "../services/MessageUserService";
import SendMessage from '../components/SendMessage'; 
import ReceiveMessage from '../components/ReceiveMessage'; 

export default function MessageDashboard({ user }) {
    const { channelId } = useParams();
    const [interactedUsers, setInteractedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(channelId || "");
    const [messages, setMessages] = useState([]);

    const fetchInteractedUsers = useCallback(async () => {
        try {
            const users = await MessageUserService.getInteractedUsers(user);
            setInteractedUsers(users || []);
        } catch (error) {
            console.error("Error fetching interacted users:", error);
        }
    }, [user]);

    const fetchMessages = useCallback(async () => {
        if (!selectedUser) return;

        try {
            const messagesData = await MessageUserService.getMessages(selectedUser, user);
            console.log("Messages fetched for user:", selectedUser, messagesData); // Debugging line
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

    return (
        <div className="message-dashboard">
            <main className="message-content">
                <header className="message-header">
                    <h1>Messages</h1>
                    <div className="message-to">
                        <span>To: </span>
                        <select 
                            value={selectedUser} 
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select a user</option>
                            {interactedUsers.length > 0 ? (
                                interactedUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.email}
                                    </option>
                                ))
                            ) : (
                                <option value="">No users available</option>
                            )}
                        </select>
                    </div>
                </header>

                {/* ReceiveMessage Component */}
                <ReceiveMessage user={user} selectedUser={selectedUser} />

                {/* SendMessage Component */}
                <SendMessage user={user} selectedUser={selectedUser} onMessageSent={fetchMessages} />
            </main>
        </div>
    );
}
