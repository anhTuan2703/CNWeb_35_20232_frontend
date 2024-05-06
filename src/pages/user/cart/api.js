// api.js

export async function fetchCartData() {
    // URL của API để lấy dữ liệu giỏ hàng
    const url = 'api/order/detail';

    try {
        // Thực hiện yêu cầu GET đến API
        const response = await fetch(url);

        // Kiểm tra xem yêu cầu có thành công không
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Chuyển đổi dữ liệu trả về từ API thành đối tượng JavaScript
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}
