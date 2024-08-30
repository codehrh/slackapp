import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
    getUsers: async function (user) {
        console.log("getUsers called with user:", user);
        try {
            if (!user || !user.accessToken || !user.expiry || !user.client || !user.uid) {
                console.error("Invalid user object:", user);
                throw new Error("Invalid user object");
            }

            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            };
            console.log("Making API request to:", `${API_URL}/users`);
            console.log("With headers:", headers);

            const response = await axios.get(`${API_URL}/users`, { headers });
            console.log("API response received:", response);
            
            if (response.data && Array.isArray(response.data.data)) {
                const users = response.data.data;
                const filteredUsers = users.filter((user) => user.id >= 5100);
                console.log("Filtered users:", filteredUsers);
                return filteredUsers;
            } else {
                console.error("Unexpected response format:", response);
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error in getUsers:", error);
            if (axios.isAxiosError(error)) {
                console.error("Axios error details:", {
                    message: error.message,
                    response: error.response,
                    request: error.request,
                });
            }
            throw error; // Re-throw the error to be handled by the component
        }
    },
    signUp: async function (info) {
        if(info.password !== info.password_confirmation) {
            return alert ("Passwords don't match");
        }
        try{
            const response = await axios.post(`${API_URL}/auth/`, info)
            const {data} = response
            if(data.data){
                return alert("Account creation successful")
            }
        } catch (error){
            if (error.response.data.errors) {
                return alert ("Account creation failed");
            }
        }
    }
}

export default UserService;