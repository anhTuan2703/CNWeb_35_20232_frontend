const category = { //tạm gọi là mảng chứa sản phẩm
    manFashion: {
      title: "Thời trang nam",
      products: [
        {
          id: "0101",
          img: require("../img/ao-thun.jpg"),
          name: "Áo thun",
          price: 200000,
          description: "100% cotton co dãn 2 chiều, bo cổ dày dặn, giặt máy thoải mái, hình in sắc nét",
          number: "300",
          rating: "",
        },
        {
          id: "0102",
          img: require("../img/ao-ba-lo.jpg"),
          name: "Áo ba lỗ",
          price: 200000,
          description: "Với thiết kế phù hợp với gymer, cho bạn cảm giác sảng khoái, thoải mái trong những ngày hè nóng nực",
          number: "400",
          rating: "",
        }
      ],
    },
    womanFashion: {
      title: "Thời trang nữ",
      products: [
        {
          id: "0201",
          img: require("../img/ao-hai-day.jpg"),
          name: "Áo 2 dây",
          price: 200000,
          description: "Thiết kế mỏng nhẹ, đường vân sắc nét, gợi cảm. Đây chắc chắn là trợ thủ đắc lực cho chị em vào mùa hè và cũng là công cụ hữu hiệu nhất giữ chân các ông chồng ở nhà, không cho đi nhậu",
          number: "500",
          rating: "",
        },
      ],
    },
    phonesAndAccessories: {
      title: "Điện thoại và phụ kiện",
      products: [
        {
          id: "0301",
          img: require("../img/iphone14promax.png"),
          name: "Iphone 14 Pro Max 1TB",
          price: 20000000,
          description: "Với thiết kế độc đáo, gọn nhẹ, chiếc điện thoại thông minh này chắc chắn sẽ làm bạn hài lòng kể cả khi bạn có là khách hàng khó tính nhất",
          number: "20",
          rating: "",
        },
      ],
    },
    electronicDevice: {
      title: "Thiết bị điện tử",
      products: [
        {
          id: "0401",
          img: require("../img/xiaomi-tv.jpg"),
          name: "Xiaomi Google TV FHD 43 inch 43A (L43M8 - P2SEA)",
          price: 5000000,
          description: "Tivi Xiaomi Google TV FHD 43 inch 43A (L43M8 - P2SEA) đã có mặt tại NhanhNhuChop. Với thiết kế nhỏ gọn, mỏng nhưng không manh, mang đến cho người dùng trải nghiệm tuyệt vời.",
          number: "10",
          rating: "4,3",
        },
      ],
    },
    desktopAndLaptop: {
      title: "Máy tính và laptop",
      products: [
        {
          id: "0501",
          img: require("../img/legion-5.jpg"),
          name: "Laptop Lenovo Legion 5 15IAH7 (82RC008RVN)",
          price: 24999000,
          description: "Laptop Lenovo Legion 5 với cấu hình chip AMD Ryzen 7 5600H, Ram 16GB, SSD 512GB chắc chắn là sự lựa chọn hàng đầu dành cho các game thủ hay lập trình viên",
          number: "15",
          rating: "",
        },
      ],
    },
    watches: {
      title: "Đồng hồ",
      products: [
        {
          id: "0601",
          img: require("../img/apple-watch.jpg"),
          name: "Apple watch series 5 GPS 44mm Aluminum Case with Sport Band",
          price: 3499000,
          description: "Đồng hồ Apple watch series 5 GPS 44mm là sản phẩm vừa mới ra lò của nhà Apple, cung cấp tính năng chụp hình từ xa giúp cho bạn không cần phải đau đầu mỗi khi không có người chụp ảnh",
          number: "50",
          rating: "",
        },
      ],
    },
    shoes: {
      title: "Giày dép",
      products: [
        {
          id: "0701",
          img: require("../img/nike-af1.png"),
          name: "Nike Air Force 1'07 Men's Shoes",
          price: 2990000,
          description: "Đôi giày quốc dân, không thể thiếu trong tủ giày của mỗi người. Nike AF1 là sự lựa chọn hàng đầu khi phối đồ với phong cách thể thao, thanh lịch, hay thậm chí là một chiếc blazer với 1 cái quần âu đầy sang trọng",
          number: "600",
          rating: "",
        },
      ],
    },
    houseWare: {
      title: "Đồ gia dụng",
      products: [
        {
          id: "0801",
          img: require("../img/noichienkodau.jpg"),
          name: "Nồi chiên không dầu Sunhouse SHD4062 6 lít",
          price: 1590000,
          description: "Bạn thích ăn đồ chiên rán nhưng sợ béo? Đừng lo bởi vì đã có nồi chiên không dầu Sunhouse SHD4062 6 lít, giúp loại bỏ hoàn toàn mỡ",
          number: "150",
          rating: "",
        },
      ],
    },

};

export default category;