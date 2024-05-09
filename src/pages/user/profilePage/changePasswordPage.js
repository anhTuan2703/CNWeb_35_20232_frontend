import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");

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
