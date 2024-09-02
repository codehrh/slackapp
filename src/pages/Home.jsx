import { useState } from "react";


export default function Home() {

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h1>Test</h1>
            </div>
            <div className="main-content">
                <div className="messages-container">

                    <div className="message">Message 1</div>
                    <div className="message">Message 2</div>

                </div>
                <div className="message-input-container">
                    <input type="text" placeholder="Type your message..." />
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}