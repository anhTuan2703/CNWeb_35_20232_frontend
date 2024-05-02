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

const HomePage = () => {

  const [cart, setCart] = useState([]);

  const addToCart = (item) => { // hàm được thêm để add vào giỏ hàng
    setCart(prevCart => [...prevCart, item]);
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
                  <li onClick={() => addToCart(item)}> {/* Thêm onClick để thêm sản phẩm vào giỏ hàng */}
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