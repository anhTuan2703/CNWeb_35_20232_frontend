import { memo } from "react";
import './style.css';

const Header = () => {
  return (
    <div className="header_top">
      <div className="container">Header</div>
    </div>
  );
};

export default memo(Header);