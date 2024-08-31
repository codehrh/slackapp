import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import ChannelService from "../services/ChannelService";
import { useNavigate } from "react-router-dom";
import SendMessage from '../components/SendMessage'; 

export default function Dashboard({ setIsLoggedIn, user }) {
    const [userList, setUserList] = useState([]);
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState(null);
    const [channelFlag, setChannelFlag] = useState(true);
    const navigate = useNavigate();

    // Fetch users when the component mounts or when `user` changes
    useEffect(() => {
        async function fetchUsers() {
            try {
                console.log("Fetching users with user:", user);
                const users = await UserService.getUsers(user);
                setUserList(users || []);  // Ensure userList is always an array
                setError(null);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error.message || "An error occurred while fetching users");
                setUserList([]);  // Ensure userList is an empty array on error
            }
        }

        if (user) {
            fetchUsers();
        } else {
            console.error("User object is null or undefined");
            setError("User is not authenticated");
        }
    }, [user]);

    // Fetch channels when the component mounts or when `channelFlag` changes
    useEffect(() => {
        async function getChannels() {
            try {
                const channelsData = await ChannelService.getChannels(user);
                setChannels(channelsData || []);  // Ensure channels is always an array
            } catch (error) {
                console.error("Error fetching channels:", error);
                setError(error.message || "An error occurred while fetching channels");
                setChannels([]);  // Ensure channels is an empty array on error
            }
        }

        if (channelFlag && user) {
            setChannelFlag(false);
            getChannels();
        }
    }, [user, channelFlag]);

    // Logout function
    function logout() {
        console.log("Logging out");
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <div>
            <h1>This is my Dashboard</h1>
            <button onClick={logout}>Log Out</button>
            
            {/* Display error message if any */}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            
            {/* Display user list */}
            <h2>User List</h2>
            {userList && userList.length > 0 ? (
                userList.map((student) => {
                    const { id, email } = student;
                    return (
                        <div key={id}>
                            <p>ID: {id}</p>
                            <p>Email: {email}</p>
                        </div>
                    );
                })
            ) : (
                <div>Loading users . . .</div>
            )}

            {/* Display channels list */}
            <h2>Channels</h2>
            {channels && channels.length > 0 ? (
                channels.map((channel) => {
                    const { id, name, owner_id } = channel;
                    return (
                        <div key={id}>
                            <p>Channel ID: {id}</p>
                            <p>Channel Name: {name}</p>
                            <p>Owner ID: {owner_id}</p>
                        </div>
                    );
                })
            ) : (
                <div>Loading channels . . .</div>
            )}

            {/* If there are no channels */}
            {channels && channels.length === 0 && <div>No Channels Available</div>}
            
            {/* SendMessage component with user prop */}
            <SendMessage user={user} />
        </div>
    );
}
