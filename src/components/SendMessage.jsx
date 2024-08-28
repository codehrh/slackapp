
function SendMessage() {
    const {user} = props;
    const [receiver, setReceiver] = useState();
    const [message, setMessage] = useState();


    async function handleSubmit(event){
        event.preventDefault();
        const info = {
            receiver_id: Number(receiver),
            receiver_class: "User",
            body: message
        };
        await MessageUserService.sendMessage(user, info);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Send to:</label>
                <input type="number"
                onChange={(event)=> setReceiver(event.target.value)}>
                </input>
                <label>Message:</label>
                <input type="text" onChange={(event)=> setMessage(event.target.value)}></input>
                <button type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default SendMessage;