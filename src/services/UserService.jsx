import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
    // Sign up a new user
    signUp: async function (info) {
        // Validate that passwords match before proceeding
        if (info.password !== info.password_confirmation) {
            return alert("Passwords don't match");
        }

        try {
            console.log("Sending signup request to:", `${API_URL}/auth/`);  // Log the request URL
            console.log("Payload being sent:", info);  // Log the payload

            // Make the POST request to the signup endpoint
            const response = await axios.post(`${API_URL}/auth/`, info);
            console.log("API response received:", response);

            // Handle the success response
            if (response.data) {
                alert("Account creation successful");
                return response.data;  // Return the created user data
            } else {
                console.error("Unexpected response format:", response);
                throw new Error("Account creation failed with invalid response format");
            }
        } catch (error) {
            console.error("Error during signup:", error);

            // Improved error handling
            if (error.response && error.response.data && error.response.data.errors) {
                // Check if errors is an object or an array and handle appropriately
                const errors = error.response.data.errors;

                if (typeof errors === 'object') {
                    // If errors is an object, format it for display
                    const errorMessages = Object.keys(errors).map(key => `${key}: ${errors[key]}`).join(', ');
                    alert(`Account creation failed: ${errorMessages}`);
                } else {
                    // Handle other cases where errors might be a string or array
                    alert(`Account creation failed: ${errors}`);
                }
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    }    
}

export default UserService;
