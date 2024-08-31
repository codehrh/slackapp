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

            // Safely access the data property
            if (response && response.data && Array.isArray(response.data.data)) {
                return response.data.data;  // Return the array of channels
            } else {
                console.error("Unexpected response structure:", response);
                return [];  // Return an empty array if the response structure is unexpected
            }
        } catch (error) {
            console.error("Error fetching channels:", error);
            return [];  // Return an empty array in case of error
        }
    }
};

export default ChannelService;
