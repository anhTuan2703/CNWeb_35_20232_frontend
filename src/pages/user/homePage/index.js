import React, { useState, useEffect, memo } from 'react';
import "./style.css";
import { formater } from "../../../utils/formater";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "../../../style/style.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ROUTERS } from '../../../utils/router';

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState({});

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/product/all-product');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setMenuItems(data || []);
      // Giả sử dữ liệu trả về có cấu trúc { categories: { ... }, products: [...] }
      setCategories(data.categories || {});
    } catch (error) {
      console.error('Could not fetch products:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const addToCart = async (customerID, item) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order/customer/${customerID}/product/${item.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: 1 }), // Giả sử bạn chỉ muốn thêm 1 sản phẩm
      });
      if (!response.ok) throw new Error('Lỗi khi thêm vào giỏ hàng.');
  
      const result = await response.json();
      if (result.success) {
        alert('Sản phẩm đã được thêm vào giỏ hàng thành công!');
        return true;
      } else {
        alert('Không thể thêm sản phẩm vào giỏ hàng.');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
      return false;
    }
  };
  

  const renderProducts = () => {
    const tabList = [];
    const tabPanels = [];

    Object.keys(categories).forEach((key, index) => {
      tabList.push(<Tab key={index}>{categories[key].title}</Tab>);

      const tabPanel = menuItems
        .filter(item => item.categoryId === categories[key].id)
        .map((item, j) => (
          <div className="col-3" key={j}>
            <div className="product_item">
              <div className="product_item_pic" style={{ backgroundImage: `url(${item.img})` }}>
                <ul className="product_item_pic_hover">
                  <li>
                    <Link to={`${ROUTERS.USER.PRODUCT}?productID=${item.id}`}> <AiOutlineEye /> </Link> {/* Xem chi tiết sản phẩm */}
                  </li>
                  <li onClick={() => addToCart(item)}> {/* Thêm sản phẩm vào giỏ hàng */}
                    <AiOutlineShoppingCart /> {/* Biểu tượng giỏ hàng */}
                  </li>
                </ul>
              </div>
              <div className="product_item_text">
                <h6>
                  <Link to="">{item.name}</Link>
                </h6>
                <h5>{formater(item.price)}</h5>
              </div>
            </div>
          </div>
        ));

      tabPanels.push(
        <TabPanel key={key}>
          <div className="row">{tabPanel}</div>
        </TabPanel>
      );
    });

    return (
      <Tabs>
        <TabList>{tabList}</TabList>
        {tabPanels}
      </Tabs>
    );
  };

  return (
    <div className="container">
      <div className="product-grid">
        <div className="title">
          <h3>Sản phẩm nổi bật</h3>
        </div>
        {/* Hiển thị danh sách sản phẩm */}
        {renderProducts()}
      </div>
    </div>
  );
};

export default memo(HomePage);
