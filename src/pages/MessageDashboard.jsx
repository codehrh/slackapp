import { useEffect, useState } from "react";
import ChannelService from "../services/ChannelService";

//Line 41 need to finish once video has been checked.

export default function Dashboard(props) {
    const { setIsLoggedIn, user } = props;
    const [ channels, setChannels ] = useState ([]);
    const [ channelFlag, setChannelFlag ] = useState(true);
    

    useEffect(()=>{
       async function getChannels(){
        await ChannelService.getChannels(user, setChannels)
       }
       if(channelFlag){
        setChannelFlag(false);
        getChannels();
       }
    }, [user, channelFlag]);


    function logout() {
        localStorage.clear();
        setIsLoggedIn(false);
    }
    return (
        <div>
            <h1>This is my Dashboard</h1>
            {/* mapping of channels happens here */}
            {channels &&
                channels.map((channel) => {
                    const { id, name, owner_id } = channel;
                    return (
                        <div key={id}>
                            <p>Channel ID: {id}</p>
                            <p>Channel Name: {name}</p>
                            <p>Owner ID: {owner_id}</p>
                        </div>
                    );
                })};
            {!channels && <div>No Channels Available</div>}
            <SendMessage></SendMessage>
            <button onclick={logout}></button>
        </div>
    );
}
