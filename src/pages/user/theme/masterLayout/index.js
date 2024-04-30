import { memo } from "react";
import Header from "../header";
import Footer from "../footer";

const MasterLayout = ({children, ...props}) => {
  const currentPath = window.location.pathname;
  const hideHeaderFooter = window.location.hostname === 'localhost' && (currentPath === '/' || currentPath === '/signup');
  return (
    <div {...props}>
      {!hideHeaderFooter && <Header/>}
      {children}
      {!hideHeaderFooter && <Footer/>}
    </div>
  );
};

export default memo(MasterLayout);