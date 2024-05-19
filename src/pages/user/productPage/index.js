import { memo, useState, useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import { formater } from "../../../utils/formater";

import {jwtDecode} from 'jwt-decode';
import "./style.css"; 

const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productID = searchParams.get("productID");
  const [customerID, setCustomerID] = useState(null);
  //console.log(productID);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCustomerID(decodedToken.id); // Giả sử 'id' trong token là customerID
    } else {
      console.log("Không tìm thấy token");
    }
  }, []);

  // Hàm này sẽ thêm một item vào giỏ hàng trong cơ sở dữ liệu
  const addToCart = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/order/add-product/${productID}`, {
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

  const [product, setProduct] = useState(null);
  const fetchProduct = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/product/all-product');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      const foundProduct = data.find(item => String(item.id) === productID);
      setProduct(foundProduct || null);
    } catch (error) {
      console.error('Could not fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productID]);

  if (!product) {
    return <div>Loading...</div>; // Show loading state or error message if product is not found
  }
  console.log(product.image);
  console.log(product);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="product_img_col">
            {<img className="product_image" src={product.image} alt={product.name} />}
          </div>
        </div>
        <div className="col-6">
          <div className="product_info_col">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Giá: {formater(product.price)}</p>
            <p className="product_des">Mô tả sản phẩm: {product.description}</p>
            <p className="product_num">{product.number} sản phẩm có sẵn</p>
            <button onClick={() => addToCart(product)} className="sub_btn">Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductPage);
