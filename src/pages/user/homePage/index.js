import React, { useState } from 'react';
import { memo } from "react";
import "./style.css";
import { formater } from "../../../utils/formater";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "../../../style/style.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import category from '../../../data/productData';
import { ROUTERS } from '../../../utils/router';
import CartsPage from '../cart/cart'

const HomePage = () => {

  const [cart, setCart] = useState([]);

  // Thêm sản phẩm vào giỏ hàng
const addToCart = (product) => {
  // Lấy giỏ hàng hiện tại từ localStorage
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProduct = currentCart.find((item) => item.id === product.id);

  if (existingProduct) {
    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
    const updatedCart = currentCart.map(item => 
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng với số lượng là 1
    const updatedCart = [...currentCart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  alert('Sản phẩm đã được thêm vào giỏ hàng thành công!');
};

  

  const renderProducts = (data) => {
    const tabList = [];
    const tabPanels = [];

    Object.keys(data).forEach((key,index) => {
      tabList.push(<Tab key={index}>{data[key].title}</Tab>);

      const tabPanel=[];    
      data[key].products.forEach((item,j) => {
        tabPanel.push(
          <div className="col-3" key={j}>
            <div className="product_item">
              <div className="product_item_pic" style={{backgroundImage: `url(${item.img})`,}}>
                <ul className="product_item_pic_hover">
                  <li>
                    <Link to={`${ROUTERS.USER.PRODUCT}?productID=${item.id}`}> <AiOutlineEye/> </Link>  {/*biểu tượng này để sau này xem chi tiết sản phẩm */}
                  </li>
                  <li onClick={() => addToCart(item)}>
                    <AiOutlineShoppingCart/> {/*biểu tượng này để thêm vào giỏ hàng ngay tức khắc */}
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
          </div>)
      });
      tabPanels.push(tabPanel);
    });

    return (
      <Tabs>
        <TabList>{tabList}</TabList>
          {tabPanels.map((item,key) => (
            <TabPanel key={key}>
              <div className="row">{item}</div>
            </TabPanel>
          ))}
      </Tabs>
    );
  };

  

  return (
    <>
    <div className="container">
      <div className="product-grid">
        <div className="title">
          <h3>Sản phẩm nổi bật</h3>
        </div>
        {/* hiển thị danh sách sản phẩm */}
        {renderProducts(category)} 
      </div>
    </div>
    </>
    
  );
};

export default memo(HomePage);