import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  return <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-3">
          <div className="footer_custom_take_care">
            <h1>CHĂM SÓC KHÁCH HÀNG</h1>
            <ul>
              <li>
                <Link to={""}>
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link to={""}>
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link to={""}>
                  Hướng dẫn bán hàng
                </Link>
              </li>
              <li>
                <Link to={""}>
                  Chính sách bảo hành
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-3">
          <div className="footer_about">
            <h1>VỀ NHANHNHUCHOP</h1>
            <ul>
              <li>
                <Link to={""}>
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to={""}>
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link to={""}>
                  Điều khoản
                </Link>
              </li>
              <li>
                <Link to={""}>
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-3">
          <div className="footer_payment">
            <h1>THANH TOÁN</h1>
          </div>
        </div>
        <div className="col-3">
          <div className="footer_social_network">
            <h1>THEO DÕI CHÚNG TÔI TRÊN</h1>
            <ul>
              <li>
                <Link to={""}>
                  <AiOutlineFacebook /> <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link to={""}>
                  <AiOutlineInstagram /> <span>Instagram</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
};

export default memo(Footer);