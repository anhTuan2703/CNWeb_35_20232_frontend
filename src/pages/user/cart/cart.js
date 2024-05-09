import React, { useState, useEffect } from 'react';
import { memo } from "react";
import './cart.css'; 
import { fetchCartData } from './api'; 

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
            if (data) {
                setCart(data.items_order);
                setShippingInfo(data.shipping_info);
                setShippingFee(data.ship_price);
            }
        });
        fetchShippingInfo().then(data => {
            if (data) {
                setShippingInfo(data);
            }
        });
    }, []);

    const fetchShippingInfo = async () => {
        try {
            const response = await fetch('YOUR_SHIPPING_INFO_API_URL');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Could not fetch shipping info:', error);
        }
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

    const handleSaveShippingInfo = async (event) => {
        event.preventDefault();
        const orderId = 'YOUR_ORDER_ID';
        try {
            const response = await fetch(`api/order/shippingInfo/${orderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shippingInfo),
            });
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi lưu thông tin giao hàng');
            }
            const data = await response.json();
            alert('Thông tin giao hàng đã được lưu thành công!');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0) + shippingFee;
    };

    const handleCheckout = () => {
        fetch('YOUR_CHECKOUT_API_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart: cart,
                shippingInfo: shippingInfo,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Thanh toán thành công!');
            setCart([]);
            localStorage.removeItem('cart');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };    

    return (
        <div className="cartWrapper">
            <h1 className="cartTitle">Your Cart</h1>
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
            <hr className="divider" />
            <div className="shipping-fee">
                <label htmlFor="shippingFee" className="label-shippingFee">Phí ship hàng:</label>
                <span>{shippingFee}</span>
            </div>
            <hr className="divider" />
            <form className="shipping-info-form" onSubmit={handleSaveShippingInfo}>
                <label>
                    Địa chỉ:
                    <input type="text" name="address" value={shippingInfo.address || ''} onChange={handleShippingInfoChange} />
                </label>
                <label>
                    Số điện thoại:
                    <input type="text" name="phoneNo" value={shippingInfo.phoneNo || ''} onChange={handleShippingInfoChange} />
                </label>
                <label>
                    Thành phố:
                    <input type="text" name="city" value={shippingInfo.city || ''} onChange={handleShippingInfoChange} />
                </label>
                <button type="submit" className="save-button">Lưu</button>
            </form>

            <div className="cart-total">
                <span>Tổng cộng:</span>
                <span>{calculateTotal()} VNĐ</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>Thanh toán</button>
        </div>
    );
};

export default memo(CartsPage);
