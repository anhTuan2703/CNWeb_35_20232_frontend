import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import { ROUTERS } from '../../../utils/router';
import { formater } from '../../../utils/formater';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductItem = memo(({ item }) => (
  <Grid item xs={12} sm={4} md={4} lg={2} style={{margin: '10px'}}>
    <Card sx={{ maxHeight: 350, maxWidth: 250 }}>
      <CardMedia
        component="div"
        height="260px" 
        image={item.image}
        style={{ border: '1px solid #ddd', borderRadius: '8px'}}
        sx={{ height: 200 }}
      >
        <ul className="product_item_pic_hover">
          <li>
            <Link to={`${ROUTERS.USER.PRODUCT}?productID=${item.id}`}>
              <AiOutlineEye style={{ fontSize: '30px', color:'red' }} /> {/* Adjust icon size */}
            </Link>
          </li>
          <li onClick={() => addToCart(item)}>
            <AiOutlineShoppingCart style={{ fontSize: '30px', color: 'red' }} /> {/* Adjust icon size */}
          </li>
        </ul>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div">
          <Link to="">{item.name}</Link>
        </Typography>
        <Typography variant="h5" component="div">
          {formater(item.price)}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
));

const addToCart = async (customerID, item) => {
  try {
    const response = await fetch(`http://localhost:3001/api/order/customer/${customerID}/product/${item.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: 1 }), // Giả sử bạn chỉ muốn thêm 1 sản phẩm
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

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);

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

  return (
    <div className="container">
      <div className="product-grid">
        <div className="title">
          <h3>Sản phẩm nổi bật</h3>
        </div>
        <Grid container spacing={2}>
          {menuItems.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default memo(HomePage);
