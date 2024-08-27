import { useState } from "react";
import UserService from "../services/UserService";


export default function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password_confirmation, setPasswordConfirmation] = useState();
    const {setShowSignup} = props;

    async function handleSubmit(event){
        event.preventDefault();
        const info = {
            email,
            password,
            password_confirmation,
        }

        await UserService.signUp(info);
        await setShowSignup(false);
    }

    function handleLogin(){
        setShowSignup(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" onChange={(event)=> setEmail(event.target.value)}></input>
                <label>Password:</label>
                <input type="password" onChange={(event)=> setPassword(event.target.value)}></input>
                <label>Password Confirmation:</label>
                <input type="password" onChange={(event)=> setPasswordConfirmation(event.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
            <br></br>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}