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

const HomePage = () => {

  const category = { //tạm gọi là mảng chứa sản phẩm
    manFashion: {
      title: "Thời trang nam",
      products: [
        {
          img: aothun,
          name: "Áo thun",
          price: 200000,
        },
        {
          img: aobalo,
          name: "Áo ba lỗ",
          price: 200000,
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
        },
      ],
    },
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
                    <AiOutlineEye/>
                  </li>
                  <li>
                    <AiOutlineShoppingCart/>
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