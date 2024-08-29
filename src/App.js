
import './App.css';
import { useEffect, useState } from 'react';
import { API_URL } from './constants/Constants';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey , faUserPlus} from '@fortawesome/free-solid-svg-icons'
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';

//lesson
// import Users from "./components/Users";
// import AddUsers from "./components/AddUsers";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  //for Signup

  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true)
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return alert("Invalid Credentials");
    }
    try {
      const loginCredentials = {
        email, password
      }
      const response = await axios.post(
        `${API_URL}/auth/sign_in`,
        loginCredentials)
      const { data, headers } = response;

      if (data && headers) {
        const accessToken = headers["access-token"];
        const expiry = headers["expiry"]
        const client = headers["client"]
        const uid = headers["uid"]

        setUser({
          accessToken,
          expiry,
          client,
          uid,
          id: data.data.id,
        })

        setIsLoggedIn(true)
      }
    } catch (error) {
      if (error.response.data.errors) {
        return alert("Invalid Credentials")
      }
    }
  }

  function toggleSignup() {
    showSignup ? setShowSignup(false) : setShowSignup(true);
  }

  return (
    <div className="App">
      <h1>This is a h1/Slack</h1>
      <div className="login">
        {!isLoggedIn && (
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            ></input><br />
            <label>Password</label>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <div className='two-buttons'>
          
              <button type="button" className="secondary-button" onClick={toggleSignup}><FontAwesomeIcon icon={faUserPlus} className='icon'/>Sign Up</button>
              <br/>
              <button type="submit"><FontAwesomeIcon icon={faKey} className='icon'/>Login</button>
            </div>
          </form>
        )}
        {showSignup && (
          <SignUp>
            setShowSignup={setShowSignup}
            setIsLoggedIn={setIsLoggedIn}
          </SignUp>
        )}
        {isLoggedIn && (
          <Dashboard setIsLoggedIn={setIsLoggedIn} user={user}></Dashboard>
        )}
      </div>
    </div>
  );
}

export default App;
