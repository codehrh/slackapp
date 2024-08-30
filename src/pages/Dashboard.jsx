import { useEffect, useState } from "react";
import UserService from "../services/UserService";
// import { Navigate, useNavigate} from "react-router";

export default function Dashboard(props) {
    const { setIsLoggedIn, user } = props;
    const [ userList, setUserList ] = useState ([]);
    

    useEffect(()=>{
        async function fetchUsers(){
            const users = await UserService.getUsers(user);
            setUserList(users);
        }
        if (userList.length === 0) {
            fetchUsers();
        }
    });


    function logout() {
        localStorage.clear();
        setIsLoggedIn(false);
    }
    return (
        <div>
            <h1>This is my Dashboard</h1>
            <button onClick={logout}>Log Out</button>
            {/* mapping of users happens here */}
            {userList &&
                userList.map((students) => {
                    const { id, email } = students;
                    return (
                        <div key={id}>
                            <p>ID: {id}</p>
                            <p>Email: {email}</p>
                        </div>
                    );
                })};
            {!userList && <div>No Users Available </div>}
        </div>
    );
}
