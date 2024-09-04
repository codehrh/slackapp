import React, { useState, useEffect } from 'react';
import ChannelService from '../services/ChannelService';

export default function AddUsersToChannel({ channel, user, onUserAdded }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch the list of users; this method needs to be implemented in your service
      const usersData = await ChannelService.getUsers(user);
      setUsers(usersData);
    } catch (error) {
      setError('Failed to load users');
    }
  };

  const handleAddUser = async () => {
    if (!selectedUser) {
      setError('Please select a user');
      return;
    }

    try {
      await ChannelService.addUserToChannel(user, channel.id, selectedUser.id);
      onUserAdded(selectedUser);
      setSelectedUser(null);
      setError(null);
    } catch (error) {
      setError('Failed to add user to channel');
    }
  };

  return (
    <div className="add-users-to-channel">
      <h3>Add Users to {channel.name}</h3>
      <select onChange={(e) => setSelectedUser(users.find(u => u.id === e.target.value))} value={selectedUser?.id || ''}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleAddUser}>Add User</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}