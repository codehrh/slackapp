import { useState } from "react";
import UserService from "../services/UserService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUserCheck } from '@fortawesome/free-solid-svg-icons';

export default function SignUp(props) {
    // Initialize state for email, password, and password confirmation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState(null); // To handle any errors
    const { setShowSignup } = props;  // Prop passed from parent to toggle the signup form

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        // Clear any previous errors
        setError(null);

        // Validate passwords before submitting
        if (password !== password_confirmation) {
            return setError("Passwords do not match!");
        }

        const info = {
            email,
            password,
            password_confirmation,
        };

        // Call UserService to sign up the user
        try {
            await UserService.signUp(info);
            setShowSignup(false);  // Close the signup form after successful signup
        } catch (error) {
            console.error("Error during signup:", error);

            // Display the error message received from UserService
            if (error.response && error.response.data && error.response.data.errors) {
                setError("Signup failed. Please check the form and try again.");
            } else {
                setError("Signup failed. Please try again.");
            }
        }
    }

    // Handle switching to login
    function handleLogin() {
        setShowSignup(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}  // Controlled input
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="Enter your email"
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}  // Controlled input
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    placeholder="Enter your password"
                />
                <label>Password Confirmation:</label>
                <input
                    type="password"
                    value={password_confirmation}  // Controlled input
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                    required
                    placeholder="Confirm your password"
                />
                
                {/* Display error message if there's an error */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className='two-buttons'>
                    <button type="submit" className="secondary-button">
                        <FontAwesomeIcon icon={faUserCheck} className='icon' /> Submit
                    </button>
                    <br />
                    <button type="button" onClick={handleLogin}>
                        <FontAwesomeIcon icon={faKey} className='icon' /> Login
                    </button>
                </div>
            </form>
            <br />
        </div>
    );
}
