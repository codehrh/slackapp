import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ setIsLoggedIn, user }) {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUsers() {
            try {
                console.log("Fetching users with user:", user);
                const users = await UserService.getUsers(user);
                setUserList(users);
                setError(null);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error.message || "An error occurred while fetching users");
                setUserList([]);
            }
        }

        if (user) {
            fetchUsers();
        } else {
            console.error("User object is null or undefined");
            setError("User is not authenticated");
        }
    }, [user]);

    function logout() {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <div>
            <h1>This is my Dashboard</h1>
            <button onClick={logout}>Log Out</button>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {userList.length > 0 ? (
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
                <div>No Users Available</div>
            )}
        </div>
    );
}