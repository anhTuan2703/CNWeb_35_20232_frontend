import { memo } from "react";
import "./style.css";

const AccountPage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            trái
          </div>
          <div className="col-6">
            giữa
          </div>
          <div className="col-3">
            phải
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AccountPage);