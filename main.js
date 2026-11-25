// const QUOTE_API_URL = "https://dummyjson.com/quotes/random";

// /* Hàm lấy câu danh ngôn ngẫu nhiên từ API bên ngoài*/
// async function fetchRandomQuote() {
//     const quoteTextElement = document.getElementById("quote-text");
//     const quoteAuthorElement = document.getElementById("quote-author");
//     const newQuoteButton = document.getElementById("btn-new-quote");

//     try {
//         // Tạm thời vô hiệu hóa nút bấm và đổi hiệu ứng chữ trong lúc chờ tải dữ liệu từ API
//         newQuoteButton.disabled = true;
//         quoteTextElement.textContent = "Đang tải câu nói truyền cảm hứng...";
//         quoteAuthorElement.textContent = "";

//         // Gọi API sử dụng hàm fetch (Asynchronous JavaScript)
//         const response = await fetch(QUOTE_API_URL);

//         if (!response.ok) {
//             throw new Error("Không thể kết nối đến máy chủ API!");
//         }

//         const data = await response.json();

//         // Cập nhật nội dung danh ngôn và tác giả lên giao diện HTML
//         quoteTextElement.textContent = `"${data.quote}"`;
//         quoteAuthorElement.textContent = `- ${data.author}`;
//     } catch (error) {
//         console.error("Lỗi khi tải Quote API:", error);
//         quoteTextElement.textContent = '"Hành trình vạn dặm bắt đầu từ một bước chân."';
//         quoteAuthorElement.textContent = "- Lão Tử (Dữ liệu dự phòng)";
//     } finally {
//         // Mở lại nút bấm sau khi tải xong dữ liệu
//         newQuoteButton.disabled = false;
//     }
// }

// /**
//  * Khởi tạo các sự kiện và tải dữ liệu ban đầu khi trang web hoàn tất tải DOM
//  */
// document.addEventListener("DOMContentLoaded", function () {
//     // 1. Tải câu danh ngôn lần đầu tiên khi truy cập trang web
//     fetchRandomQuote();

//     // 2. Tương tác: Bắt sự kiện người dùng bấm nút "Đổi câu khác"
//     const newQuoteButton = document.getElementById("btn-new-quote");
//     if (newQuoteButton) {
//         newQuoteButton.addEventListener("click", fetchRandomQuote);
//     }
// });

const { createApp } = Vue;

const QUOTE_API_URL = "https://dummyjson.com/quotes/random";

createApp({
  data() {
    return {
      quoteText: "",
      quoteAuthor: "",
      isLoading: false,
    };
  },
  methods: {
    async fetchRandomQuote() {
      this.isLoading = true;
      this.quoteText = "Đang tải câu nói truyền cảm hứng...";
      this.quoteAuthor = "";

      try {
        const response = await fetch(QUOTE_API_URL);

        if (!response.ok) {
          throw new Error("Không thể kết nối đến máy chủ API!");
        }

        const data = await response.json();
        this.quoteText = `"${data.quote}"`;
        this.quoteAuthor = `- ${data.author}`;
      } catch (error) {
        console.error("Lỗi khi tải Quote API:", error);
        this.quoteText = '"Hành trình vạn dặm bắt đầu từ một bước chân."';
        this.quoteAuthor = "- Lão Tử (Dữ liệu dự phòng)";
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    // Tự động gọi API khi ứng dụng Vue gắn vào trang
    this.fetchRandomQuote();
  },
}).mount("#app");
