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
import AdminPage from "./pages/admin";
import SearchResultPage from "./pages/user/homePage/searchResultPage";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage/>
    },
    {
      path: '/',
      component: <HomePage/>,
      exact: true
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
      path: `${ROUTERS.USER.HOME}/cart`,
      component: <CartsPage/>
    },
    {
      path: `${ROUTERS.USER.HOME}/product`,
      component: <ProductPage/>
    },
    {
      path: ROUTERS.USER.ADMIN,
      component: <AdminPage/>
    },
    {
      path: ROUTERS.USER.SEARCH,
      component: <SearchResultPage/>
    },
    {
      path: `${ROUTERS.USER.SEARCH}/product`,
      component: <ProductPage/>
    },
    {
      path: `${ROUTERS.USER.SEARCH}/cart`,
      component: <CartsPage/>
    },
    {
      path: `/product`,
      component: <ProductPage/>
    },
    {
      path: ROUTERS.USER.LOGIN,
      component: <Login />
    },
  ];

  return (
    <MasterLayout>
      <Routes>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component}/>
        ))}
      </Routes>
    </MasterLayout>
 );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;