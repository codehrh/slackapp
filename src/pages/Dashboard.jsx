import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

export default function Dashboard(props) {
  const { setIsLoggedIn, user } = props;
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchUsers() {
      const users = await UserService.getUsers(user);
      setUserList(users);
    }
    if (userList.length === 0 && user) {
      fetchUsers();
    }
  }, [userList, user]);

  function logout() {
    console.log("Logging out clicked");
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div>
      <h1>This is my Dashboard</h1>
      <button onClick={logout}>Log Out</button>
      {/* Mapping of users happens here */}
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
