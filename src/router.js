import { Component, Profiler } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/homePage";
import MasterLayout from "./pages/user/theme/masterLayout";
import ChangeInfoPage from "./pages/user/profilePage/changeInfoPage";
import AccountPage from "./pages/user/profilePage/accountPage";
import Login from "./pages/login/login";
import CartsPage from "./pages/user/cart/cart";
import ProductPage from "./pages/user/productPage";
import SignUp from "./pages/signup/signup";
import ChangePasswordPage from "./pages/user/profilePage/changePasswordPage";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage/>
    },
    {
      path: `${ROUTERS.USER.ACCESS}/profile`,
      component: <AccountPage/>
    },
    {
      path: `${ROUTERS.USER.ACCESS}/change-information`,
      component: <ChangeInfoPage/>
    },
    {
      path: `${ROUTERS.USER.ACCESS}/change-password`,
      component: <ChangePasswordPage/>
    },
    {
      path: ROUTERS.USER.SIGNUP,
      component: <SignUp/>
    },
    {
      path: ROUTERS.USER.CART,
      component: <CartsPage/>
    },
    {
      path: `${ROUTERS.USER.HOME}/product`,
      component: <ProductPage/>
    },
  ];

  return (
    <MasterLayout>
      <Routes>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component}/>
        ))}
        <Route path="/" element={<Login />} />
      </Routes>
    </MasterLayout>
 );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;