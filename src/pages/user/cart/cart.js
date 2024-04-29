import React, { useState } from 'react';
import { memo } from "react";
import './cart.css'; // Đảm bảo rằng bạn đã import file CSS

const CartItem = ({ item, index, decreaseQuantity, changeQuantity, increaseQuantity, removeFromCart }) => (
    <div className="cart-item" key={index}>
      <img className="item-image" src={item.image} alt={item.name} />
      <span className="item-name">{item.name}</span>
      <span className="item-price">{item.price}</span>
      <button className="quantity-decrease" onClick={() => decreaseQuantity(index)}>-</button>
      <input className="quantity-input" type="number" value={item.quantity} onChange={(e) => changeQuantity(index, e.target.value)} />
      <button className="quantity-increase" onClick={() => increaseQuantity(index)}>+</button>
      <button className="item-remove" onClick={() => removeFromCart(index)}>Xóa</button>
    </div>
  );

const CartsPage = () => {
    const [cart, setCart] = useState([  // Sản phẩm mẫu
        { name: 'Sản phẩm 1', price: 100, quantity: 1, image: 'https://th.bing.com/th/id/R.81ce77b1b83a6502bb070f4081f9d431?rik=lGwmxCIAkcEeKA&pid=ImgRaw&r=0' },
        { name: "Sản phẩm 2", price: 100, quantity: 2, image:'https://secomm.vn/wp-content/uploads/2022/03/10-chuc-nang-tang-doanh-thu-website-thuong-ma%CC%A3i-die%CC%A3n-tu%CC%89-Danh-sach-yeu-thich-Wishlist-1024x538.png'},
        
    ]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((item, index) => index !== indexToRemove));
        window.alert('Sản phẩm đã được xóa thành công!');
    };

    const changeQuantity = (index, quantity) => {
        setCart(cart.map((item, idx) => idx === index ? {...item, quantity: parseInt(quantity)} : item));
    };

    const increaseQuantity = (index) => {
        changeQuantity(index, cart[index].quantity + 1);
    };

    const decreaseQuantity = (index) => {
        if (cart[index].quantity > 1) {
            changeQuantity(index, cart[index].quantity - 1);
        }
    };

    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        phoneNo: '',
        city: ''
    });

    const handleShippingInfoChange = (event) => {
        setShippingInfo({
            ...shippingInfo,
            [event.target.name]: event.target.value
        });
    };
    
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const [shippingFee, setShippingFee] = useState(0);

    return (
        <div className="cartWrapper">
            <h1 className="cartTitle">Your Cart</h1>
            <div className="cart-row">
                <span className="cart-header" name="cart-product">Sản phẩm</span>
                <span className="cart-header">Giá</span>
                <span className="cart-header">Số lượng</span>
                <span className="cart-header"></span>
            </div>
            {cart.map((item, index) => (
                <CartItem 
                key={index}
                item={item}
                index={index}
                decreaseQuantity={decreaseQuantity}
                changeQuantity={changeQuantity}
                increaseQuantity={increaseQuantity}
                removeFromCart={removeFromCart}
                />
            ))}
            <hr className="divider" /> {/* Đường kẻ ngang */}
            <div className="shipping-fee">
                <label htmlFor="shippingFee" className="label-shippingFee">Phí ship hàng:</label>
                <input type="text" className='shippingFee' id="shippingFee" val1q       e={shippingFee} onChange={(e) => setShippingFee(e.target.value)} />
            </div>
            <hr className="divider" /> {/* Đường kẻ ngang */}
            <form className="shipping-info-form">
                <label>
                    Địa chỉ:
                    <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingInfoChange} />
                </label>
                <label>
                    Số điện thoại:
                    <input type="text" name="phoneNo" value={shippingInfo.phoneNo} onChange={handleShippingInfoChange} />
                </label>
                <label>
                    Thành phố:
                    <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingInfoChange} />
                </label>
            </form>
            <div className="cart-total">
                <span>Tổng cộng:</span>
                <span>{calculateTotal()}</span>
            </div>
            <button className="checkout-button">Thanh toán</button>
        </div>
    );
};

export default memo(CartsPage);
