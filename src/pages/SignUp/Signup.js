import React, { useState } from 'react';
import axios from 'axios';
import {
  CssBaseline,
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
import HowToRegIcon from '@mui/icons-material/HowToReg';

const theme = createTheme();

const initFormValue = {
  account_name: '',
  password: '',
  name: '',
  cccd: '',
  email: '',
  phone_number: '',
  date_of_birth: '',
};

export default function SignUp() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormErrors({}); 

    axios
      .post('http://localhost:3001/api/v1/access/register', formValue)
      .then((res) => {
        if (res.data.success) {
          window.location.href = '/';
          console.log('Đăng ký thành công');
        } else {
          setFormErrors({ submit: res.data.message });
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        setFormErrors({ submit: 'Có lỗi xảy ra, vui lòng thử lại.' });
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Box} sx={{ p: 6 }}>
          <Container maxWidth="sm">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
            <HowToRegIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    autoComplete="account_name"
                    name="account_name"
                    required
                    fullWidth
                    id="account_name"
                    label="Account Name"
                    autoFocus
                    value={formValue.account_name}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formValue.password}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={formValue.name}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="cccd"
                    label="CCCD"
                    name="cccd"
                    autoComplete="cccd"
                    value={formValue.cccd}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={formValue.email}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="phone_number"
                    label="Phone Number"
                    name="phone_number"
                    autoComplete="phone_number"
                    value={formValue.phone_number}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="date_of_birth"
                    label="Date of Birth"
                    name="date_of_birth"
                    type="date"
                    autoComplete="date_of_birth"
                    value={formValue.date_of_birth}
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
                sx={{ mt: 3, mb: 2 }}
                >
                {isSubmitting ? <CircularProgress size={24} /> : 'Đăng Ký'}
                </Button>
            </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

