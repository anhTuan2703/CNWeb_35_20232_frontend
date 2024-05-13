import { memo, useState, useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import category from "../../../data/productData";
import { formater } from "../../../utils/formater";
import "./style.css"; 

const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productID = searchParams.get("productID");

  // Hàm này sẽ thêm một item vào giỏ hàng trong cơ sở dữ liệu
  const addToCart = async (item) => {
    try {
      const response = await fetch(' api/order/:orderId/product/:productId', {
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

  const renderProduct = (pID) => {
    for (const categoryKey in category) {
      const products = category[categoryKey].products;
      const foundProduct = products.find(product => product.id === pID);
      
      if (foundProduct) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="product_img_col">
                  <img className="product_image" src={foundProduct.img} alt={foundProduct.name} />
                </div>
              </div>
              <div className="col-6">
                <div className="product_info_col">
                  <h2 className="product-name">{foundProduct.name}</h2>
                  <p className="product-price">Giá: {formater(foundProduct.price)}</p>
                  <p className="product_des">Mô tả sản phẩm: {foundProduct.description}</p>
                  <p className="product_num">{foundProduct.number} sản phẩm có sẵn</p>
                  <button onClick={() => addToCart(foundProduct)} className="sub_btn">Đặt hàng</button>
                </div>
              </div>
            </div>
            
          </div>
        );
      }
    }
    return <p className="not-found">Product not found!</p>;
  };

  return (
    <div>
      {renderProduct(productID)}
    </div>
  );
};

export default memo(ProductPage);
