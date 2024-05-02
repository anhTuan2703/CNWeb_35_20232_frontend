import React, { useState } from 'react';
import "./login.css";

export default function Login () {
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleSignupClick = () => {
        window.location.href = '/signup';
    }

    return (
        <div className="Login-form">
            <h1>Group 35</h1>
            <div className="login-background">
                <div className="login-container">
                    <div className="tittle">Log in</div>
                    <div className="text">Email or Username</div>
                    <input
                        type="text"
                        className="text username-input" // Thêm lớp CSS cho input username
                        value={formData.username}
                        placeholder="Your Username"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />

                    <input
                        type="password"
                        className="text password-input" // Thêm lớp CSS cho input password
                        value={formData.password}
                        placeholder="Your password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <br></br>

                    <button className="login-button" >Sign in</button>

                    <br></br>
                    
                    <div className="signup-link" onClick={handleSignupClick}>Don't have an account?</div>
                </div>
            </div>
        </div>
    );
}