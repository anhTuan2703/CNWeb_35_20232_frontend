import React, { useState } from 'react';
import { useHistory, Navigate, Link } from 'react-router-dom';
import "./login.css";
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    // Thực hiện xử lý đăng nhập với dữ liệu trong formData
    // Ví dụ:
    await axios.post('http://localhost:3001/api/v1/access/login', {
      account_name: formData.username, password: formData.password
    }).then(res => {
      if(res.data.success) {
        localStorage.setItem('token', res.data.token);
                // Đăng nhập thành công, chuyển đến trang chủ
        window.location.href = '/home';
        console.log("Đăng nhập thành công");
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
    // try {
    //   const response = await fetch('http://localhost:3001/api/v1/access/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: {account_name: formData.username, password: formData.password}
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     // Đăng nhập thành công, chuyển đến trang chủ
    //     window.location.href = '/';
    //     console.log("Đăng nhập thành công");
    //   } else {
    //     // Đăng nhập thất bại, hiển thị thông báo lỗi
    //     console.log("Đăng nhập thất bại");
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
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

          <Link to="/signup" className="signup-link">Don't have an account?</Link>
        </div>
      </div>
    </div>
  );
}