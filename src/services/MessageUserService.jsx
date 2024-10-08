import { API_URL } from "../constants/Constants";
import axios from "axios";

const MessageUserService = {
    getInteractedUsers: async function (user) {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };

            const response = await axios.get(`${API_URL}/users`, { headers });
            return response.data.data; 
        } catch (error) {
            console.error("Error fetching interacted users:", error);
            throw error;
        }
    },

    getMessages: async function (receiverId, user, receiverClass = "User") {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };

            // Dynamically set the receiver_class based on whether you're fetching for a user or channel
            const response = await axios.get(`${API_URL}/messages`, {
                headers,
                params: { receiver_id: receiverId, receiver_class: receiverClass }, // receiver_class can be 'User' or 'Channel'
            });
            return response.data.data; // Assuming the message data is returned under the 'data' key
        } catch (error) {
            console.error("Error fetching messages:", error);
            throw error;
        }
    },

    sendMessage: async function (user, info) {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };

            // Add sender's information to the message info
            const messageWithSenderInfo = {
                ...info,
                sender_id: user.id,
                sender_email: user.email,
            };

            const response = await axios.post(`${API_URL}/messages`, messageWithSenderInfo, { headers });
            return response.data;
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    },
};

export default MessageUserService;
