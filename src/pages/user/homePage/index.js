import React, { useState } from 'react';
import { memo } from "react";
import "./style.css";
import { formater } from "../../../utils/formater";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "../../../style/style.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import aothun from "../../../img/ao-thun.jpg";
import aobalo from "../../../img/ao-ba-lo.jpg";
import ao2day from "../../../img/ao-hai-day.jpg";
import ip14prm from "../../../img/iphone14promax.png";
import xiaomitv from "../../../img/xiaomi-tv.jpg";
import legion5 from "../../../img/legion-5.jpg";
import applewatch from "../../../img/apple-watch.jpg";
import af1 from "../../../img/nike-af1.png";
import nckd from "../../../img/noichienkodau.jpg";

const HomePage = () => {

  const category = { //tạm gọi là mảng chứa sản phẩm
    manFashion: {
      title: "Thời trang nam",
      products: [
        {
          img: aothun,
          name: "Áo thun",
          price: 200000,
          description: "",
          number: "",
          rating: "",
        },
        {
          img: aobalo,
          name: "Áo ba lỗ",
          price: 200000,
          description: "",
          number: "",
          rating: "",
        }
      ],
    },
    womanFashion: {
      title: "Thời trang nữ",
      products: [
        {
          img: ao2day,
          name: "Áo 2 dây",
          price: 200000,
          description: "",
          number: "",
          rating: "",
        },
      ],
    },
    phonesAndAccessories: {
      title: "Điện thoại và phụ kiện",
      products: [
        {
          img: ip14prm,
          name: "Iphone 14 Pro Max 1TB",
          price: 20000000,
          description: "",
          number: "",
          rating: "",
        },
      ],
    },
    electronicDevice: {
      title: "Thiết bị điện tử",
      products: [
        {
          img: xiaomitv,
          name: "Xiaomi Google TV FHD 43 inch 43A (L43M8 - P2SEA)",
          price: 5000000,
          description: "",
          number: "",
          rating: "",
        },
      ],
    },
    desktopAndLaptop: {
      title: "Máy tính và laptop",
      products: [
        {
          img: legion5,
          name: "Laptop Lenovo Legion 5 15IAH7 (82RC008RVN)",
          price: 24999000,
          description: "",
          number: "",
          rating: "",
        },
      ],
    },
    watches: {
      title: "Đồng hồ",
      products: [
        {
          img: applewatch,
          name: "Apple watch series 5 GPS 44mm Aluminum Case with Sport Band",
          price: 3499000,
          description: "",
          number: "",
          rating: "",
        },
      ],
    },
    shoes: {
      title: "Giày dép",
      products: [
        {
          img: af1,
          name: "Nike Air Force 1'07 Men's Shoes",
          price: 2990000,
          description: "",
          number: "",
          rating: "",
        },
      ],
    },
    houseWare: {
      title: "Đồ gia dụng",
      products: [
        {
          img: nckd,
          name: "Nồi chiên không dầu Sunhouse SHD4062 6 lít",
          price: 1590000,
          description: "",
          number: "",
          rating: "",
        },
      ],
    },

  };

  const [cart, setCart] = useState([]);

  const addToCart = (item) => { 
    // Cập nhật trạng thái ngay lập tức
    let newCart = [...cart];
    newCart.push(item);
    setCart(newCart);
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
                    <AiOutlineEye/> {/*biểu tượng này để sau này xem chi tiết sản phẩm */}
                  </li>
                  <li> 
                    <AiOutlineShoppingCart onClick={() => addToCart(item)}/> {}
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
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
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