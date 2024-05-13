import React, { useState, useEffect, memo } from 'react';
import './cart.css'; 

// Hàm này sẽ gửi dữ liệu cập nhật đến backend
const saveChangesToBackend = async (cart, shippingInfo, orderId) => {
  try {
    // Chuyển đổi dữ liệu giỏ hàng để phù hợp với cấu trúc backend mong đợi
    const itemsOrder = cart.map(item => ({
      id: item.id.toString(),
      amount: item.quantity.toString()
    }));

    // Cập nhật thông tin giao hàng để phù hợp với tên trường của backend
    const updatedShippingInfo = {
      address: shippingInfo.address,
      phoneNo: shippingInfo.phone, // Sử dụng 'phoneNo' thay vì 'phone'
      city: shippingInfo.city
    };

    // Gửi yêu cầu cập nhật giỏ hàng
    const cartResponse = await fetch(`api/order/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items_order: itemsOrder }),
    });
    if (!cartResponse.ok) throw new Error('Lỗi cập nhật giỏ hàng.');

    // Gửi yêu cầu cập nhật thông tin giao hàng
    const shippingResponse = await fetch(`api/order/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shipping_info: updatedShippingInfo }),
    });
    if (!shippingResponse.ok) throw new Error('Lỗi cập nhật thông tin giao hàng.');

    alert('Các thay đổi đã được lưu thành công!');
  } catch (error) {
    console.error('Error:', error);
    alert('Có lỗi xảy ra khi lưu thay đổi.');
  }
};

const CartItem = ({ item, onQuantityChange }) => (
    <div className="cart-item">
      <img className="item-image" src={item.image} alt={item.name} />
      <div className="item-details">
        <span className="item-name">{item.name}</span>
        <span className="item-price">{item.price} VNĐ</span>
        <div className="item-quantity-controls">
          <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
          <input type="number" value={item.quantity} readOnly />
          <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
        </div>
      </div>
    </div>
);

const CartsPage = () => {
    const [cart, setCart] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});
    const [shippingFee, setShippingFee] = useState(0);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const orderId = 'your-order-id'; // Thay thế 'your-order-id' bằng ID đơn hàng thực tế

    // Hàm lấy thông tin giỏ hàng, thông tin giao hàng và phí ship từ backend
    const fetchCartAndShippingInfo = async () => {
        try {
            const response = await fetch('/api/cart/details');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCart(data.cartItems);
            setShippingInfo(data.shippingInfo);
            setShippingFee(data.shippingFee);
        } catch (error) {
            console.error('Could not fetch cart and shipping info:', error);
        }
    };

    useEffect(() => {
        fetchCartAndShippingInfo();
    }, []);

    const handleQuantityChange = (itemId, delta) => {
        const newCart = cart.map(item => 
            item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        );
        setCart(newCart);
        setIsDataChanged(true);
    };

    const handleShippingChange = (event) => {
        const { name, value } = event.target;
        setShippingInfo(prevInfo => ({ ...prevInfo, [name]: value }));
        setIsDataChanged(true);
    };

    const handleSaveChanges = () => {
        if (isDataChanged) {
            saveChangesToBackend(cart, shippingInfo, orderId);
            setIsDataChanged(false);
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart }),
            });
            if (!response.ok) throw new Error('Lỗi khi thực hiện thanh toán.');

            const result = await response.json();
            if (result.success) {
                alert('Thanh toán thành công!');
                // Xử lý sau khi thanh toán thành công (ví dụ: cập nhật UI, chuyển hướng, v.v.)
            } else {
                alert('Thanh toán không thành công.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi thực hiện thanh toán.');
        }
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cartWrapper">
            <h1>Giỏ Hàng Của Bạn</h1>
            {cart.map(item => (
                <CartItem 
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                />
            ))}
            <div className="shipping-info">
                <h2>Thông Tin Giao Hàng</h2>
                <input type="text" name="address" value={shippingInfo.address || ''} onChange={handleShippingChange} placeholder="Địa chỉ" />
                <input type="text" name="phoneNo" value={shippingInfo.phoneNo || ''} onChange={handleShippingChange} placeholder="Số điện thoại" />
                <input type="text" name="city" value={shippingInfo.city || ''} onChange={handleShippingChange} placeholder="Thành phố" />
            </div>
            
            <button onClick={handleSaveChanges} disabled={!isDataChanged}>Lưu Thay Đổi</button>
            <div className="total-price">
                <span>Tổng cộng: {calculateTotalPrice()} VNĐ</span>
            </div>                      
                
            <button onClick={handleCheckout} className="checkout-button">Thanh Toán</button>
        </div>
    );
};

export default memo(CartsPage);
