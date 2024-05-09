import React, { memo, useState } from "react";
import "./style.css";

const AccountPage = () => {
  const [bank, setBank] = useState(""); // State cho ngân hàng liên kết
  const [address, setAddress] = useState(""); // State cho địa chỉ

  const handleBankChange = (event) => {
    setBank(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
          </div>
          <div className="col-6">
            <label htmlFor="bank">Ngân hàng liên kết:</label>
            <input
              type="text"
              id="bank"
              value={bank}
              onChange={handleBankChange}
            />
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="col-3">
            {/* Thêm các thông tin khác nếu cần */}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AccountPage);
