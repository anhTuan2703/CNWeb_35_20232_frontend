import { memo, useState, useRef, useEffect } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import { useNavigate } from "react-router-dom";
import logo from "../../../../img/cropedLogo.png";
import axios from "axios";
import { SearchBar } from "./searchbar";
import { SearchResultsList } from "./searchResultList";

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

  const handleSearch = async () => {
    const query = queryInputRef.current.value;
    navigate(`/query?q=${query}`);
    
    try {
      const response = await axios.get(`http://localhost:3001/api/product/query?q=${query}`);
      console.log('kết quả tìm kiếm:', response.data);
    } 
    catch (error) {
      console.error('Lỗi mẹ rồi:', error);
    }
  };

  const [results, setResults] = useState([]);

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
          <div className="search-field">
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
          </div>
          {/*<button className="btn-search" onClick={handleSearch}>Tìm kiếm</button>*/}
        </div>
    </div>
      
    </>
    
  );
};

export default memo(Header);