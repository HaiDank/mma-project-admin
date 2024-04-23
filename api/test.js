// Import hàm getTransaction từ tệp của bạn
import { getTransaction } from './path/to/your/getTransaction';

// Tạo một hàm async để thực hiện việc gọi và in kết quả ra console
const testGetTransaction = async () => {
    try {
        // Gọi hàm getTransaction với các tham số cần thiết, ví dụ:
        const token = 'your_auth_token';
        const transactions = await getTransaction(token);
        
        // In kết quả ra console
        console.log('Transaction data:', transactions);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Gọi hàm testGetTransaction để bắt đầu quá trình kiểm tra
testGetTransaction();
