import { memo } from "react";
import Header from "../header";
import Footer from "../footer";

const MasterLayout = ({children, ...props}) => {
  const currentPath = window.location.pathname;
  const hideHeaderFooter = window.location.hostname === 'localhost' && (currentPath === '/login' || currentPath === '/signup' || currentPath === '/search/login' || currentPath === '/home/login');
  return (
    <div {...props}>
      {!hideHeaderFooter && <Header/>}
      {children}
      {!hideHeaderFooter && <Footer/>}
    </div>
  );
};

export default memo(MasterLayout);