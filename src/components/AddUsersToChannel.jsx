import React, { useState, useEffect } from 'react';
import ChannelService from '../services/ChannelService';

export default function AddUsersToChannel({ channel, user, onUserAdded }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await ChannelService.getUsers(user);
            console.log('Fetched Users:', usersData); // Debugging
            setUsers(usersData);
            setFilteredUsers(usersData);
        } catch (error) {
            setError('Failed to load users');
        }
    };

    useEffect(() => {
        console.log('Search Query:', searchQuery); // Debugging
        console.log('All Users:', users); // Debugging

        if (searchQuery === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            console.log('Filtered Users:', filtered); // Debugging
            setFilteredUsers(filtered);
        }
    }, [searchQuery, users]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setSearchQuery(user.email);
        setFilteredUsers([]);
    };

    const handleAddUser = async () => {
        if (!selectedUser) {
            setError('Please select a user');
            return;
        }

        try {
            await ChannelService.addUserToChannel(user, channel.id, selectedUser.id);
            onUserAdded(selectedUser); // Notify parent component or update state
            setSelectedUser(null);
            setSearchQuery('');
            setError(null);
        } catch (error) {
            setError('Failed to add user to channel');
        }
    };

    return (
        <div className="add-users">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for users..."
                className="search-bar"
            />
            {filteredUsers.length > 0 && searchQuery && (
                <ul className="user-list">
                    {filteredUsers.map(user => (
                        <li
                            key={user.id}
                            onClick={() => handleUserClick(user)}
                            style={{ cursor: 'pointer', padding: '5px' }}
                        >
                            {user.email}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleAddUser}>Add User</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}