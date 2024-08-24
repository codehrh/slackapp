import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
    getUsers: async function (user){
        try{
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid,
            }
            const response = await axios.get(`${API_URL}/users`, {headers})
            const users = response.data.data;
            return users.filter((user)=> user.id >= 5100)
        } catch (error){
            if (error.response.data.errors) {
                return alert ("Cannot retrieve users");
            }
        }
    },
};

export default UserService;