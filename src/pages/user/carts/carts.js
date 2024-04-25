import React, { useState } from 'react';
import { memo } from "react";

const CartsPage = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    return (
        <div>
            <h1>Giỏ hàng</h1>
            {cart.map((item, index) => (
                <div key={index}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    );
};

export default memo(CartsPage);
