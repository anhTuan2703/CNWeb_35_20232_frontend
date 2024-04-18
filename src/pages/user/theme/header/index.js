import { memo, useState } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { formater } from "../../../../utils/formater";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ROUTERS } from "../../../../utils/router";

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
  ])

  return (
    <>
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-6">Thời gian giao hàng nhanh như chớp</div>
            <div className="col-6 header_top_right">
              <ul>
                <li>
                  <Link to={""}>
                    Hỗ trợ
                  </Link>
                </li>
                |
                <li>
                  <Link to={ROUTERS.USER.PROFILE}>
                    Tài khoản
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
                  <Link to={""}>
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
                <form>
                  <input type="text" placeholder="Bạn đang tìm gì?" />
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