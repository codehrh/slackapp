import { useState } from "react";
import axios from "axios";

export default function AddUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // Create an object for post in the database
    const user = {
      name,
      email,
    };
    axios.post(`https://jsonplaceholder.typicode.com/users`, user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          name="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <button type="submit">Login</button>
      </form> {/* Closing form tag */}
    </div>
  );
}
