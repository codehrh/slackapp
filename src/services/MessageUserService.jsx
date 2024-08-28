import { API_URL } from "../constants/Constants";
import axios from "axios";

const MessageUserService = {
    sendMessage: async function (user, info) {
        try{
            const headers = {
            "access-token": user.accessToken,
            expiry: user.expiry,
            client: user.client,
            uid: user.uid,
        };
        const response = await axios.get(`${API_URL}/messages`, info, {headers})
        const {data} = response
        if(data.data){
            return alert("Successfully sent message")
        } else {
            return alert("Cannot send message")
        }
    }
        catch(error){
            console.log(error);
        }
    },
};