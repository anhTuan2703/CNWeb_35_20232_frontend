import { memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import { formater } from "../../../utils/formater";

const HomePage = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <div>
      <Carousel responsive={responsive}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>;
    </div>
    <div className="product-grid">
      {[...Array(20)].map((_, index) => (
        <div key={index} className="product-item">
          {/* Thêm nội dung cho ô sản phẩm ở đây */}
          <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lryo3vnzx3tlbe_tn" alt="Hình ảnh" />
          <p className="product-name">Áo thun stussy nam nữ form rộng chất liệu cotton co giãn 2 chiều</p>
          <p>Price: {formater(150000)}</p>
        </div>
      ))}
    </div>
    </>
    
  );
};

export default memo(HomePage);