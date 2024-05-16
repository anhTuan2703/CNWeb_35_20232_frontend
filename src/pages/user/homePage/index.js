import React, { useState, useEffect, memo } from 'react';
import "./style.css";
import { formater } from "../../../utils/formater";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "../../../style/style.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import { ROUTERS } from '../../../utils/router';
import Slidejpg1 from "../../../img/slide1.jpg";
import Slidejpg2 from "../../../img/slide2.jpg";
import Slidejpg3 from "../../../img/slide3.jpg";
import ImageSlider from "./ImageSlider";
import secu from "../../../img/security.png";
import deli from "../../../img/delivery-truck.png";
import undo from "../../../img/undo.png";

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

  const slides = [
    { url: Slidejpg1, title: "sl1" },
    { url: Slidejpg2, title: "sl2" },
    { url: Slidejpg3, title: "sl3" },
  ];
  const containerStyles = {
    width: "800px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <>
      <div style={containerStyles}>
        <ImageSlider slides={slides}/>
      </div>

      <div className="sub-banner">
        <div className="item">
            <img src={secu} alt=""/>
            <div className="text">
                <p>BẢO HÀNH</p>
                <p>ÍT NHẤT <span>1 NĂM</span></p>
            </div>
        </div>

        <div className="item">
            <img src={undo} alt=""/>
            <div className="text">
                <p>ĐỔI/TRẢ MIỄN PHÍ</p>
                <p>TRONG <span>30 NGÀY</span></p>
            </div>
        </div>

        <div className="item">
            <img src={deli} alt=""/>
            <div className="text">
                <p><span>MIỄN PHÍ </span>VẬN CHUYỂN</p>
                <p>ĐƠN TỪ 499.000Đ</p>
            </div>
        </div>
    </div>

      <div className="container">
        <div className="product-grid">
          <div className="title">
            <h3>Sản phẩm nổi bật</h3>
          </div>
          {/* Hiển thị danh sách sản phẩm */}
          {renderProducts()}
        </div>
      </div>
    </>
  );
};

export default memo(HomePage);
