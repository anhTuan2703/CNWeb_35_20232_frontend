import React, { useState, useEffect } from 'react';
import { memo } from "react";
import './cart.css'; // Đảm bảo rằng bạn đã import file CSS
import { fetchCartData } from './api'; // Import hàm fetchCartData từ file api.js

const CartItem = ({ item, index, decreaseQuantity, changeQuantity, increaseQuantity, removeFromCart }) => (
    <div className="cart-item" key={index}>
      <img className="item-image" src={item.image} alt={item.name} />
      <div className="item-details">
        <span className="item-name">{item.name}</span>
        <span className="item-price">{item.price} VNĐ</span>
      </div>
      <div className="item-quantity-controls">
        <button className="quantity-decrease" onClick={() => decreaseQuantity(index)}>-</button>
        <input className="quantity-input" type="number" value={item.quantity} onChange={(e) => changeQuantity(index, e.target.value)} />
        <button className="quantity-increase" onClick={() => increaseQuantity(index)}>+</button>
      </div>
      <button className="item-remove" onClick={() => removeFromCart(index)}>Xóa</button>
    </div>
);

const CartsPage = () => {
    const [cart, setCart] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});
    const [shippingFee, setShippingFee] = useState(0);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        fetchCartData().then(data => {
            if (data) { // Kiểm tra xem data có tồn tại không
                setCart(data.items_order);
                setShippingInfo(data.shipping_info);
                setShippingFee(data.ship_price);
            }
        });
    }, []);

    const displayCart = () => {
        return cart.map((item, index) => (
            <CartItem 
            key={index}
            item={item}
            index={index}
            decreaseQuantity={decreaseQuantity}
            changeQuantity={changeQuantity}
            increaseQuantity={increaseQuantity}
            removeFromCart={removeFromCart}
            />
        ));
    };

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((item, index) => index !== indexToRemove);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.alert('Sản phẩm đã được xóa thành công!');
    };

    const changeQuantity = (index, quantity) => {
        const updatedCart = cart.map((item, idx) => idx === index ? {...item, quantity: parseInt(quantity)} : item);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const increaseQuantity = (index) => {
        changeQuantity(index, cart[index].quantity + 1);
    };

    const decreaseQuantity = (index) => {
        if (cart[index].quantity > 1) {
            changeQuantity(index, cart[index].quantity - 1);
        }
    };

    const handleShippingInfoChange = (event) => {
        setShippingInfo({
            ...shippingInfo,
            [event.target.name]: event.target.value
        });
    };
    
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cartWrapper">
            <h1 className="cartTitle">Your Cart</h1>
            {displayCart()}
            <hr className="divider" /> {/* Đường kẻ ngang */}
            <div className="shipping-fee">
                <label htmlFor="shippingFee" className="label-shippingFee">Phí ship hàng:</label>
                <span>{shippingFee}</span> {/* Hiển thị biến phí ship hàng ở đây */}
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
                <span>{calculateTotal() + shippingFee} VNĐ</span> {/* Cộng thêm phí ship hàng vào tổng cộng */}
            </div>
            <button className="checkout-button">Thanh toán</button>
        </div>
    );
};

export default memo(CartsPage);
