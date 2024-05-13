import { memo, useState, useRef } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { formater } from "../../../../utils/formater";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ROUTERS } from "../../../../utils/router";
import { useNavigate } from "react-router-dom";
import logo from "../../../../img/cropedLogo.png";

const Header = () => {
  const [menus, setMenus] = useState([
    {
      name: "Trang chủ",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Giỏ hàng",
      path: ROUTERS.USER.CART,
    },
    {
      name: "Thông tin cá nhân",
      path: `${ROUTERS.USER.ACCESS}/change-information`,
    },
    {
      name: "Đổi mật khẩu",
      path: `${ROUTERS.USER.ACCESS}/change-password`,
    }
  ]);

  const navigate = useNavigate();
  const queryInputRef = useRef(null);

  const handleSearch = () => {
    const query = queryInputRef.current.value;
    navigate(`/search?q=${query}`);
};

  return (
    <>
      <div className="header_top">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="header_logo">
              <Link to={ROUTERS.USER.HOME}>
                <img src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="col-6">
            <nav className="header_menu">
              <ul>
                {/* cái này là menu ở bên trên thanh tìm kiếm ý */}
                {menus?.map((menu, menuKey) => (
                  <li key={menuKey} className={menuKey === 0 ? "active": ""}>
                    <Link to={menu?.path}>{menu?.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      </div>
      <div className="search">
        <div className="search-bar">
            <div className="search-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path
                        d="M16.5769 8.03846C16.5769 12.478 12.978 16.0769 8.53846 16.0769C4.09894 16.0769 0.5 12.478 0.5 8.03846C0.5 3.59894 4.09894 0 8.53846 0C12.978 0 16.5769 3.59894 16.5769 8.03846ZM1.59915 8.03846C1.59915 11.8709 4.70598 14.9778 8.53846 14.9778C12.3709 14.9778 15.4778 11.8709 15.4778 8.03846C15.4778 4.20598 12.3709 1.09915 8.53846 1.09915C4.70598 1.09915 1.59915 4.20598 1.59915 8.03846Z"
                        fill="#929090" />
                    <line x1="13.63" y1="13.1775" x2="20.2069" y2="19.7544" stroke="#929090" stroke-width="2" />
                </svg>
                <input ref={queryInputRef} type="text" className="query" placeholder="Bạn đang tìm gì?" />
            </div>
            <button className="btn-search" onClick={handleSearch}>Tìm kiếm</button>
        </div>
    </div>
    </>
    
  );
};

export default memo(Header);