import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./login.css";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSignupClick = () => {
    // Chuyển đến trang đăng ký
    window.location.href = '/signup';
  }

  const handleLogin = async () => {
    // Thực hiện xử lý đăng nhập với dữ liệu trong formData
    // Ví dụ:
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        // Đăng nhập thành công, chuyển đến trang chủ
        window.location.href = '/';
        console.log("Đăng nhập thành công");
      } else {
        // Đăng nhập thất bại, hiển thị thông báo lỗi
        console.log("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            className="text username-input"
            name="username"
            value={formData.username}
            placeholder="Your Username"
            onChange={handleChange}
          />

          <input
            type="password"
            className="text password-input"
            name="password"
            value={formData.password}
            placeholder="Your password"
            onChange={handleChange}
          />

          <br></br>

          <button className="login-button" onClick={handleLogin}>Sign in</button>

          <br></br>

          <div className="signup-link" onClick={handleSignupClick}>Don't have an account?</div>
        </div>
      </div>
    </div>
  );
}