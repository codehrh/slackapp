import { API_URL } from "../constants/Constants";
import axios from "axios";

const ChannelService = {
    getChannels: async function (user) {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };

            const response = await axios.get(`${API_URL}/channels`, { headers });

            if (response && response.data && Array.isArray(response.data.data)) {
                return response.data.data; // Return the array of channels
            } else {
                console.error("Unexpected response structure:", response);
                return []; // Return an empty array if the response structure is unexpected
            }
        } catch (error) {
            console.error("Error fetching channels:", error);
            return []; // Return an empty array in case of error
        }
    },
    createChannel: async function (user, channelData) {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };

            const response = await axios.post(`${API_URL}/channels`, channelData, { headers });

            if (response.data && response.data.data) {
                return response.data.data;
            } else {
                console.error("Unexpected response structure:", response);
                throw new Error("Failed to create channel");
            }
        } catch (error) {
            console.error("Error creating channel:", error);
            throw error;
        }
    },
    getUsers: async function (user) {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };

            const response = await axios.get(`${API_URL}/users`, { headers });

            if (response && response.data && Array.isArray(response.data.data)) {
                return response.data.data; // Return the array of users
            } else {
                console.error("Unexpected response structure:", response);
                return []; // Return an empty array if the response structure is unexpected
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            return []; // Return an empty array in case of error
        }
    },
    addUserToChannel: async function (user, channelId, memberId) {
        try {
            const headers = {
                "Content-Type": "application/json",
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };

            const requestBody = {
                "id": channelId, // ID of the channel
                "member_id": memberId, // ID of the member to be added
            };

            await axios.post(`${API_URL}/channel/add_member`, requestBody, { headers });
        } catch (error) {
            console.error("Error adding user to channel:", error);
            throw error;
        }
    }
};

export default ChannelService;