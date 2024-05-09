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
    }
    else {
      try {
        const response = await axios.post('http://localhost:3001/api/v1/user/change-password', {
          userID: formData.userID,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        });
        console.log("Thay đổi mật khẩu thành công");
        setError(""); // Xóa thông báo lỗi nếu có
        } 
        catch (error) {
            console.error("Lỗi khi thay đổi mật khẩu:", error);
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
              <label htmlFor="old-password">Mật khẩu cũ:</label>
              <input
                type="password"
                id="old-password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">Mật khẩu mới:</label>
              <input
                type="password"
                id="new-password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Xác nhận mật khẩu mới:</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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
