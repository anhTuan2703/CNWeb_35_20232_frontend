import React, { useState } from 'react';
import { memo } from "react";
import './cart.css'; // Đảm bảo rằng bạn đã import file CSS

const CartsPage = () => {
    const [cart, setCart] = useState([
        { name: 'Sản phẩm 1', price: 100, quantity: 1 }, // Sản phẩm mẫu
    ]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((item, index) => index !== indexToRemove));
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

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cartWrapper">
            <h1 className="cartTitle">Your Cart</h1>
            <div className="cart-row">
                <span className="cart-header">Sản phẩm</span>
                <span className="cart-header">Giá</span>
                <span className="cart-header">Số lượng</span>
                <span className="cart-header"></span>
            </div>
            {cart.map((item, index) => (
                <div className="cart-item" key={index}>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <input type="number" value={item.quantity} onChange={(e) => changeQuantity(index, e.target.value)} />
                    <button onClick={() => increaseQuantity(index)}>+</button>
                    <button onClick={() => removeFromCart(index)}>Xóa</button>
                </div>
            ))}
            <div className="cart-total">
                <span>Tổng cộng:</span>
                <span>{calculateTotal()}</span>
            </div>
            <button className="checkout-button">Thanh toán</button>
        </div>
    );
};

export default memo(CartsPage);
