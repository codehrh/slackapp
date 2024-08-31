import { API_URL } from "../constants/Constants";
import axios from "axios";

const MessageUserService = {
    sendMessage: async function (user, info) {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };

            // Use POST to send the message
            const response = await axios.post(`${API_URL}/messages`, info, { headers });
            
            const { data } = response;
            if (data && data.data) {
                alert("Successfully sent message");
            } else {
                alert("Cannot send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("An error occurred while sending the message.");
        }
    },
};

export default MessageUserService;
