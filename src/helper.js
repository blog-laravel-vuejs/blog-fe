// Hàm formatDate
function formatDate(dateString) {
    // Tạo một đối tượng Date từ chuỗi đầu vào
    const date = new Date(dateString);
    
    // Lấy các thành phần của ngày giờ
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    
    // Tạo chuỗi định dạng mới
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Một số hàm và biến khác
function sayHello(name) {
    return `Hello, ${name}!`;
}

const PI = 3.14159;

const helper = {
    formatDate,
    sayHello,
    PI,
};

export default helper;
