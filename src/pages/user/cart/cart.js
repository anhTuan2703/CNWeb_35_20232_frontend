import React, { useState, useEffect, memo } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Card, CardContent, CardActions, Button, Typography, TextField, Box, InputBase } from '@mui/material';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { formater } from '../../../utils/formater';
import './cart.css';

const CartItem = memo(({ item, onQuantityChange, onDelete  }) => (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <img className="item-image" src={item.image} alt={item.name} style={{ marginRight: '16px' }} />
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body1">{item.price.toLocaleString()} VNĐ</Typography>
            <Box>
                <IconButton onClick={() => onQuantityChange(item.id, -1)} size="small">
                <RemoveIcon />
                </IconButton>
                <InputBase
                    value={item.amount}
                    readOnly
                    sx={{
                    width: '40px', 
                    textAlign: 'center',
                    fontSize: '1rem',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    padding: '2px 0',
                    padding: '4px 0px 5px 14px'
                    }}
                />
                <IconButton onClick={() => onQuantityChange(item.id, 1)} size="small">
                    <AddIcon />
                </IconButton>
            </Box>
                <IconButton onClick={() => onDelete(item.id)} size="small" sx={{ color: 'error.main' }}>
                    <DeleteIcon />
                </IconButton>
        </Box>
      </CardContent>
    </Card>
  ));



// Component CartsPage để quản lý trang giỏ hàng
const CartsPage = () => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({});
  const [shippingFee, setShippingFee] = useState(0);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [customerID, setCustomerID] = useState(null);

  // Hàm này sẽ gửi dữ liệu cập nhật đến backend sử dụng customerID
const saveChangesToBackend = async (cart, shippingInfo, customerID) => {
  try {
    // Chuyển đổi dữ liệu giỏ hàng để phù hợp với cấu trúc backend mong đợi
    const itemsOrder = cart.map(item => ({
      id: item.id.toString(),
      amount: item.amount.toString()
    }));

    // Cập nhật thông tin giao hàng để phù hợp với tên trường của backend
    const updatedShippingInfo = {
      address: shippingInfo.address,
      phoneNo: shippingInfo.phoneNo, // Sử dụng 'phoneNo' thay vì 'phone'
      city: shippingInfo.city
    };

    // Gửi yêu cầu cập nhật giỏ hàng
    const cartResponse = await fetch(`http://localhost:3001/api/v1/order/${customerID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  items_order: itemsOrder, 
                              shipping_info: updatedShippingInfo}),
                              ship_price: shippingFee,

    });
    if (!cartResponse.ok) throw new Error('Lỗi cập nhật giỏ hàng.');
    alert('Các thay đổi đã được lưu thành công!');
  } catch (error) {
    console.error('Error:', error);
    alert('Có lỗi xảy ra khi lưu thay đổi.');
  }
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCustomerID(decodedToken.id); // Giả sử 'id' trong token là customerID
    } else {
      console.log("Không tìm thấy token");
    }
  }, []);

  // Hàm lấy thông tin giỏ hàng, thông tin giao hàng và phí ship từ backend
  const fetchCartAndShippingInfo = async (customerID) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/order/details/${customerID}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCart(data.data.items_order);
      setShippingInfo(data.data.shipping_info);
      setShippingFee(data.data.ship_price);
      console.log("order details");
    } catch (error) {
      console.error('Could not fetch cart and shipping info:', error);
    }
  };

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

  // Lấy customerID từ token lưu trong localStorage
  

  // Khi có customerID, lấy thông tin giỏ hàng và thông tin giao hàng
  useEffect(() => {
    if (customerID) {
      fetchCartAndShippingInfo(customerID);
    }
  }, [customerID]);

  // Xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (itemId, delta) => {
    const newCart = cart.map(item => 
      item.id === itemId ? { ...item, amount: Math.max(1, item.amount + delta) } : item
    );
    setCart(newCart);
    setIsDataChanged(true);
  };

  const handleDelete = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    setIsDataChanged(true);
  };

  // Xử lý thay đổi thông tin giao hàng
  const handleShippingChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    setIsDataChanged(true);
  };

  // Xử lý lưu thay đổi
  const handleSaveChanges = () => {
    if (isDataChanged && customerID) {
      saveChangesToBackend(cart, shippingInfo, customerID);
      setIsDataChanged(false);
    }
  };

  // Xử lý thanh toán
  const handleCheckout = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/order/place-order/${customerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Lỗi khi thực hiện thanh toán.');

      const result = await response.json();
      if (result.success) {
        alert('Thanh toán thành công!');
      } else {
        alert('Thanh toán không thành công.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi thực hiện thanh toán.');
    }
  };


  // Tính tổng giá trị đơn hàng cùng phí ship
  const calculateTotalPriceWithShipping = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.amount, 0);
    return totalPrice + shippingFee;
  };

  return (
    <Box className="cartWrapper" sx={{ padding: 3 }}>
        <Box display="flex" justifyContent="center" width="100%">
            <Typography variant="h4" gutterBottom>
                Giỏ Hàng Của Bạn
            </Typography>
        </Box>

        {cart.map(item => (
            <CartItem 
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onDelete={handleDelete}
            />
        ))}

        <Box sx={{ marginTop: 2, bgcolor: 'background.paper', padding: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Thông Tin Giao Hàng</Typography>
            <TextField
            label="Địa chỉ"
            name="address"
            value={shippingInfo.address || ''}
            onChange={handleShippingChange}
            fullWidth
            margin="normal"
            variant="outlined"
            />
            <TextField
            label="Số điện thoại"
            name="phoneNo"
            value={shippingInfo.phoneNo || ''}
            onChange={handleShippingChange}
            fullWidth
            margin="normal"
            variant="outlined"
            />
            <TextField
            label="Thành phố"
            name="city"
            value={shippingInfo.city || ''}
            onChange={handleShippingChange}
            fullWidth
            margin="normal"
            variant="outlined"
            />
        </Box>
        
        <Box display="flex" justifyContent="center" width="100%">
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleSaveChanges} 
                disabled={!isDataChanged}
                sx={{ marginBottom: 2 }}
            >
                Lưu Thay Đổi
            </Button>
        </Box>
        
        
        <Card variant="outlined" sx={{ marginTop: 2 }}>
            <CardContent>
            <Typography variant="h7">Phí giao hàng: {shippingFee.toLocaleString()} VNĐ</Typography>
            </CardContent>

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2, padding: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="h6">Tổng cộng:</Typography>
                <Typography variant="h6">{formater(calculateTotalPriceWithShipping().toLocaleString())}</Typography>
            </Box>

            <CardActions>
            <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
                <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleCheckout}
                sx={{
                    bgcolor: 'success.main', 
                    '&:hover': {
                    bgcolor: 'success.dark', 
                    transform: 'scale(1.05)' 
                    },
                    '&:active': {
                    bgcolor: 'success.light', 
                    transform: 'scale(0.95)'
                    },
                    padding: '10px 30px',
                }}
                >
                Thanh Toán
                </Button>
            </Box>
            </CardActions>
        </Card>
    </Box>
  );
};

export default memo(CartsPage);
