import { memo, useState, useRef, useEffect } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import logo from "../../../../img/cropedLogo.png";
import searchingData from "./searchingData.json";

const Header = () => {
  const [menus, setMenus] = useState([
    {
      name: "Trang chủ",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Giỏ hàng",
      path: ROUTERS.USER.CART,
    }
  ]);

  const queryInputRef = useRef(null);

  const [value, setValue] = useState();
  const [searchVal, setSearchVal] = useState('');
  const [data, setData] = useState([]);

  //check xem đăng nhập chưa
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleSearch = () => {
    localStorage.setItem('searchQuery', searchVal);
    console.log('Saved to localStorage:', searchVal);
  };
  
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    setSearchVal(e.target.value);
    // Lọc dữ liệu từ data.json thay vì gọi API
    const filteredData = searchingData.filter(item => item.title.startsWith(value));
    setData(filteredData.slice(0, 5)); // Giới hạn số lượng item hiển thị
  };

  const reloadIfNecessary = () => {
    if (window.location.href.includes('localhost:3000/search')) {
      window.location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    setIsLoggedIn(false);
  };

  const handleLoginClick = () => {
    window.location.href = ROUTERS.USER.LOGIN;
    //window.location.reload(); // Tải lại trang sau khi chuyển hướng đến trang đăng nhập
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
                  {isLoggedIn && (
                    <>
                      <li>
                        <Link to={`${ROUTERS.USER.ACCESS}/change-information`}>Thông tin cá nhân</Link>
                      </li>
                      <li>
                        <Link to={`${ROUTERS.USER.ACCESS}/change-password`}>Đổi mật khẩu</Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
            <div className="col-3">
              <nav className="header_log_btn">
                <ul>
                  {/* cái này là 2 nút đăng nhập đăng xuất
                  {logMenus?.map((menu, menuKey) => (
                    <li key={menuKey} className={menuKey === 0 ? "active": ""}>
                      <Link to={""}>{menu?.name}</Link>
                    </li>
                  ))} */}
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link to={ROUTERS.USER.HOME} onClick={handleLogout}>Đăng xuất</Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link onClick={handleLoginClick}  >Đăng nhập</Link>
                    </li>
                  )}
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
            <input type="text" onChange={handleChange} value={value} ref={queryInputRef}/>
          </div>
          <Link to={ROUTERS.USER.SEARCH}>
            <button className="btn-search" onClick={() => { handleSearch(); reloadIfNecessary(); }}>Tìm kiếm</button>  
          </Link>
        </div>
        <div className="search_result_list">
          {
            value &&
            data.map(item => (
              <div key={item.id} className="search_item" onClick={(e) => setValue(item.title)}>
                {item.title}
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default memo(Header);