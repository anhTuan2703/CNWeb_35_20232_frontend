import React, { useState, useEffect, memo } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import { ROUTERS } from '../../../utils/router';
import { formater } from '../../../utils/formater';
import Slider from 'react-slick';
import slidejpg1 from "../../../img/slide1.jpg"
import slidejpg2 from "../../../img/slide2.jpg"
import slidejpg3 from "../../../img/slide3.jpg"
import ImageSlider from './ImageSlider';
import secu from "../../../img/security.png";
import deli from "../../../img/delivery-truck.png";
import undo from "../../../img/undo.png";

import "./style.css";





// const addToCart = async (item) => {
//   try {
//     const response = await fetch(`http://localhost:3001/api/v1/order/add-product/${item.id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ customer_id: customerID }), // Giả sử bạn chỉ muốn thêm 1 sản phẩm
//     });
//     if (!response.ok) throw new Error('Lỗi khi thêm vào giỏ hàng.');

//     const result = await response.json();
//     if (result.success) {
//       alert('Sản phẩm đã được thêm vào giỏ hàng thành công!');
//       return true;
//     } else {
//       alert('Không thể thêm sản phẩm vào giỏ hàng.');
//       return false;
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
//     return false;
//   }
// };

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [customerID, setCustomerID] = useState(null);

  const ProductItem = memo(({ item }) => (
    <div className="product-grid">
      <div className="product_item">
        <div className="product_item_pic" style={{backgroundImage: `url(${item.image})`}}> 
          <ul className="product_item_pic_hover">
            <li>
              <Link to={`${ROUTERS.USER.PRODUCT}?productID=${item.id}`} target ="_blank">
                <AiOutlineEye />
              </Link>
            </li>
            <li onClick={() => addToCart(item)}>
              <AiOutlineShoppingCart/>
            </li>
          </ul>
        </div>
        <div className='product_item_text'>
          <h6>{item.name}</h6>
          <h5>{formater(item.price)}</h5>
        </div>
      </div>
    </div>
  ));

  // const ProductItem = memo(({ item }) => (
  //   <Grid item xs={12} sm={4} md={4} lg={2} style={{margin: '10px'}}>
  //     <Card sx={{ maxHeight: 350, maxWidth: 250 }}>
  //       <CardMedia
  //         component="div"
  //         height="260px" 
  //         image={item.image}
  //         style={{ border: '1px solid #ddd', borderRadius: '8px'}}
  //         sx={{ height: 200 }}
  //       >
  //         <ul className="product_item_pic_hover">
  //           <li>
  //             <Link to={`${ROUTERS.USER.PRODUCT}?productID=${item.id}`}>
  //               <AiOutlineEye style={{ fontSize: '30px', color:'red' }} /> {/* Adjust icon size */}
  //             </Link>
  //           </li>
  //           <li onClick={() => addToCart(item)}>
  //             <AiOutlineShoppingCart style={{ fontSize: '30px', color: 'red' }} /> {/* Adjust icon size */}
  //           </li>
  //         </ul>
  //       </CardMedia>
  //       <CardContent>
  //         <Typography variant="h6" component="div">
  //           <Link to="">{item.name}</Link>
  //         </Typography>
  //         <Typography variant="h5" component="div">
  //           {formater(item.price)}
  //         </Typography>
  //       </CardContent>
  //     </Card>
  //   </Grid>
  // ));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCustomerID(decodedToken.id); // Giả sử 'id' trong token là customerID
    } else {
      console.log("Không tìm thấy token");
    }
  }, []);
  
  const addToCart = async (item) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/order/add-product/${item.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customer_id: customerID }), // Giả sử bạn chỉ muốn thêm 1 sản phẩm
      });
      if (!response.ok) throw new Error('Lỗi khi thêm vào giỏ hàng.');
  
      const result = await response.json();
      console.log('hi' + result.success)
      if (result.success == true) {
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

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/product/all-product');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setMenuItems(data || []);
    } catch (error) {
      console.error('Could not fetch products:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const slides = [
    { url: slidejpg1, title: "sld1" },
    { url: slidejpg2, title: "sld2" },
    { url: slidejpg3, title: "sld3" },
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

      <div className="container container2" >
        {menuItems.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default memo(HomePage);
