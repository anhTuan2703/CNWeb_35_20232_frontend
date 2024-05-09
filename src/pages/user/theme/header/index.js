import { memo, useState, useRef } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { formater } from "../../../../utils/formater";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ROUTERS } from "../../../../utils/router";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menus, setMenus] = useState([
    {
      name: "Trang chủ",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Bài viết",
      path: ROUTERS.USER.BLOGS,
    },
    {

    }
  ]);

  const navigate = useNavigate();
  const queryInputRef = useRef(null);

  const handleSearch = (e) => { {/*hiển thị url tìm kiếm */}
    e.preventDefault();
    const query = queryInputRef.current.value;
    navigate(`/search?q=${query}`);
  };

  return (
    <>
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-6">Thời gian giao hàng nhanh như chớp</div>
            <div className="col-6 header_top_right">
              <ul>
                <li>
                  <Link to={`/${ROUTERS.USER.ACCESS}/profile`}>
                    Tài khoản
                  </Link>
                </li>
                |
                <li>
                  <Link to={`/${ROUTERS.USER.ACCESS}/change-information`}>
                    Thay đổi thông tin
                  </Link>
                </li>
                |
                <li>
                  <Link to={`/${ROUTERS.USER.ACCESS}/change-password`}>
                    Đổi mật khẩu
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="header_logo">
              <h1>
                NhanhNhuChop
              </h1>
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
          <div className="col-3">
            <div className="header_cart">
              <div className="header_cart_price">
                {formater(1024000)}
              </div>
              <ul>
                <li>
                  <Link to={ROUTERS.USER.CART}> {/* giỏ hàng này */}
                    <AiOutlineShoppingCart /><span>5</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-3">Trai</div>
          <div className="col-9 header_search_container">
            <div className="header_search">
              <div className="header_search_form">
                <form onSubmit={handleSearch}> {/*tìm kiếm sản phẩm*/}
                  <input ref={queryInputRef} type="text" className="query" placeholder="Bạn đang tìm gì?" />
                  <button type="submit" className="site_btn">Tìm kiếm</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default memo(Header);