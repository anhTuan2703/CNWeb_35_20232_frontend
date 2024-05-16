import React, { useState, useEffect, memo } from 'react';
import "./style.css";
import { formater } from "../../../utils/formater";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "../../../style/style.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import category from '../../../data/productData';
import { ROUTERS } from '../../../utils/router';

const HomePage = () => {
  const MenuItem = ({item}) => (
    
    <div className="cart-item">
      <img className="item-image" src={item[0].image} alt={item[0].name} />
      <div className="item-details">
        <span className="item-name">{item[0].name}</span>
        <span className="item-price">{item[0].price} VNĐ</span>
      </div>
    </div>
  );

  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/product/all-product');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      
      const text = await response.json();
      try {
        const data = JSON.parse(text);
        setMenuItems(data.menuItem || []);
      } catch (jsonError) {
        throw new Error('Could not parse JSON: ' + jsonError.message);
      }
    } catch (error) {
      console.error('Could not fetch cart and shipping info:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const addToCart = async (item) => {
    try {
      const response = await fetch('http://localhost:3000/api/order/product/' + item.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item }),
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

  const renderProducts = (data) => {
    const tabList = [];
    const tabPanels = [];

    Object.keys(data).forEach((key, index) => {
      tabList.push(<Tab key={index}>{data[key].title}</Tab>);

      const tabPanel = [];
      data[key].products.forEach((item, j) => {
        tabPanel.push(
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
        );
      });
      tabPanels.push(tabPanel);
    });

    return (
      <Tabs>
        <TabList>{tabList}</TabList>
        {tabPanels.map((item, key) => (
          <TabPanel key={key}>
            <div className="row">{item}</div>
          </TabPanel>
        ))}
      </Tabs>
    );
  };

  return (
    <div className="container">
      <div className="product-grid">
        <div className="title">
          <h3>Sản phẩm nổi bật</h3>
        </div>
        <MenuItem
          key={item.id}
          item={item}
        />
        
        {/* Hiển thị danh sách sản phẩm */}
        {renderProducts(category)}
      </div>
    </div>
  );
};

export default memo(HomePage);
