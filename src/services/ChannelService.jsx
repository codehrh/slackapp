import { API_URL } from "../constants/Constants";
import axios from "axios";

const ChannelService = {
    getChannels: async function (user, setChannels){
        try {const headers = {
            "access-token": user.accessToken,
            expiry: user.expiry,
            client: user.client,
            uid: user.uid,
        };
        const response = await axios.get(`${API_URL}/channels`, { headers })
        const {data} = response;
        if (data){
            setChannels(data.data)
        }
    } catch(error) {
        if (error.response.data.errors){
            return alert ("Cannot retrieve channels");
        }
    }
    }
}

export default ChannelService;