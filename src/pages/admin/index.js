import React, { useState , useEffect , memo } from 'react';
import axios from 'axios';
import {
  CssBaseline,
  Card,
  CardContent,
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme({ });

const MenuItems = memo(({ item, onDelete  }) => (
  <Card variant="outlined" sx={{ marginTop: 1 }}>
    <CardContent> 
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <img className="item-image" src={item.image} alt={item.name} style={{ marginRight: '16px' }} />
          <Typography variant="h6">{item.name}</Typography>
          <Box>
              <Typography variant="h7">Số lượng: {item.number}</Typography>
          </Box>
              <IconButton onClick={() => onDelete(item.id)} size="small" sx={{ color: 'error.main' }}>
                  <DeleteIcon />
              </IconButton>
      </Box>
    </CardContent>
  </Card>
));

const initFormValue = {
  name: '',
  img: '',
  category: '',
  unit: '',
  price: '',
  description: '',
  number: ''
};

const AdminPage = () => {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/product/delete', { id: productId });
      if (response.status === 200) {
        // Xóa sản phẩm thành công, có thể thực hiện các tác vụ cần thiết, ví dụ: cập nhật lại danh sách sản phẩm
        fetchMenuItems();
      } else {
        // Xử lý lỗi nếu cần
      }
    } catch (error) {
      console.error('Could not delete product:', error);
      // Xử lý lỗi nếu cần
    }
  };
  
  return (
    <div className="container">
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" width="100%">
            <Typography variant="h4" gutterBottom>
                ADMIN DASHBOARD
            </Typography>
      </Box>
      <Grid container component="main" sx={{ marginBottom: 2}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
          }}
        >
        <Container sx={{ marginTop: 6 }} style={{ border: '1px solid #ddd', borderRadius: '4px'}}>
          {menuItems.map(item => (
              <MenuItems 
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </Container>
        
        </Grid>
        
        <Grid item xs={12} sm={8} md={5} component={Box} sx={{ p: 6}}>
          <Container style={{ border: '1px solid #ddd', borderRadius: '4px'}}>
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 1,
              }}
            >
            <Typography component="h1" variant="h5">
                Thêm sản phẩm mới
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3}}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="name"
                    label="Tên sản phẩm"
                    value={formValue.name}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="img"
                    label="URL ảnh sản phẩm"
                    value={formValue.img}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="category"
                    label="Danh mục"
                    value={formValue.category}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="unit"
                    label="Đơn vị"
                    value={formValue.unit}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="price"
                    label="Giá"
                    value={formValue.price}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="number"
                    label="Số lượng"
                    value={formValue.number}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="description"
                    label="Mô tả"
                    multiline
                    rows={4} // Tăng số hàng (rows) tại đây để tăng kích thước ô mô tả
                    value={formValue.description}
                    onChange={handleChange}
                    />
                </Grid>
                {formErrors.submit && (
                    <Grid item xs={12}>
                    <Alert severity="error">{formErrors.submit}</Alert>
                    </Grid>
                )}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
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
                      padding: '10px 15px',
                      mt: 3, mb: 2 
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Thêm sản phẩm'}
                </Button>
            </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  )
}

export default memo(AdminPage);