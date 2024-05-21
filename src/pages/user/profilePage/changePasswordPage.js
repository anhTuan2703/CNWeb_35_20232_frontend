import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "", userID:"" });
  const [error, setError] = useState("");

  useEffect(() => {
    // Lấy token từ Local Storage
    const token = localStorage.getItem('token');
    //const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzE1MjY1NTc4LCJleHAiOjE3MTUzNTE5Nzh9.zVCuNzjZiMcOys9aQ0abZB2xyYpOoV68Tj1DAo3vvZE";

    // Kiểm tra xem token có tồn tại hay không
    if (token) {
      const decodedToken = jwtDecode(token).id;
      console.log(decodedToken);
      const userId = decodedToken;
      localStorage.setItem('userID',userId);
      //console.log(localStorage.getItem('userID'));
      // Gán userId vào state formData
      setFormData((prevState) => ({
        ...prevState,
        userID: userId,
      }));
    } 
    else {
      console.log("lỗi mẹ nó rồi");  
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp");
      //console.log(formData.newPassword);
    }
    else {
      try {
        const request = await axios.post('http://localhost:3001/api/v1/user/change-password', {
          userID: formData.userID,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        });
        //if(formData.newPassword === formData.confirmPassword) console.log("2 mk đã giống nhau");
        setError(""); // Xóa thông báo lỗi nếu có
        console.log(request)
        if (request.data.success) {
          alert(request.data.message);
        }
      } 
      catch (error) {
        console.error("Lỗi khi thay đổi mật khẩu:", error);
        if (error.response && error.response.data) {
          // Hiển thị thông báo lỗi từ backend
          alert(error.response.data.message);
        } else {
          // Hiển thị thông báo lỗi chung
          alert("Đã xảy ra lỗi khi thay đổi mật khẩu.");
        }
      }
    } 
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          {/* Empty column for spacing */}
        </div>
        <div className="col-6">
          <div className="change-password-form">
            <h2>Đổi mật khẩu</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <input
                type="password"
                id="old-password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Mật khẩu cũ:"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="new-password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Mật khẩu mới:"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu mới"
                required
              />
            </div>
            {/*error && <div className="error">{error}</div>*/}
            <button type="submit" onClick={handleChangePassword}>Đổi mật khẩu</button>
          </div>
        </div>
        <div className="col-3">
          {/* Empty column for spacing */}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
