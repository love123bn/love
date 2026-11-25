# 💌 Trang Web Tỏ Tình Lãng Mạn (Love Confession Website)

Trang web tỏ tình được thiết kế với giao diện hiện đại, lãng mạn cùng hiệu ứng hoạt họa mượt mà:
- ✉️ **Hiệu ứng phong thư 3D**: Chạm vào con dấu sáp vàng để mở thư kèm âm thanh lấp lánh và chùm tim bay vút lên.
- 🌳 **Cây tình yêu từ ngàn trái tim**: Gần 600 trái tim bay lượn trên bầu trời rồi tụ hội lại, mọc thành tán cây tình yêu rực rỡ, kèm cánh hoa tim bay nhẹ nhàng.
- 📜 **Bức thư tỏ tình & Máy đánh chữ (Typewriter)**: Từng con chữ hiện ra kèm cảm xúc chân thành.
- 💖 **7 Lời hứa thiêng liêng**: Danh sách lời hứa lấp lánh xuất hiện sau khi bức thư kết thúc.
- 😜 **Nút "Em từ chối" tinh nghịch**: Tự động né chuột/ngón tay khi chạm vào kèm những câu đùa siêu đáng yêu.
- 💍 **Nút "Dạ, em đồng ý!"**: Bắn pháo hoa tim rực rỡ khắp màn hình cùng thông điệp ngọt ngào.
- 🎵 **Âm nhạc tình yêu**: Tích hợp sẵn bộ tổng hợp giai điệu du dương bằng Web Audio (hoạt động ngay cả khi offline mà không cần tải file nhạc).

---

## 🚀 Cách mở và sử dụng:
1. Bạn chỉ cần **nhấp đúp chuột vào file `index.html`** để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Cốc Cốc, Safari, Firefox,...).
2. Khi mở ra, nhấn vào **phong thư** để mở cánh thư và chiêm ngưỡng toàn bộ hiệu ứng diệu kỳ.

---

## 🎨 Hướng dẫn tùy chỉnh theo ý bạn:

### 1. Đổi tên người nhận & ngày kỷ niệm:
- Mở file `index.html`:
  - Tìm dòng: `Gửi Em - Cả Thế Giới Của Anh! 🌸` và đổi thành tên người bạn yêu (ví dụ: `Gửi Linh Đan - Cả Thế Giới Của Anh! 🌸`).
  - Tìm dòng: `Chàng trai của em ❤️` để đổi thành tên của bạn.

### 2. Tùy chỉnh nội dung bức thư tỏ tình:
- Mở file `script.js`, tìm biến `loveLetterText` ở dòng ~290:
  ```javascript
  const loveLetterText = 
    `Anh không biết từ bao giờ, nụ cười của em lại trở thành tia nắng rực rỡ nhất...\n\n` +
    `Mỗi ngày trôi qua, anh nhận ra rằng...`;
  ```
  Bạn có thể gõ những tâm sự riêng của hai người vào đây. Dấu `\n\n` là để xuống dòng.

### 3. Tùy chỉnh các lời hứa:
- Mở file `index.html`, tìm thẻ `<div class="promises-grid">` và chỉnh sửa các lời hứa theo ý muốn của bạn.

### 4. Dùng bài hát MP3 riêng của bạn (tùy chọn):
Nếu bạn muốn dùng một bài hát MP3 có lời (ví dụ như bài *Ánh Nắng Của Anh*, *Until I Found You*,...):
1. Copy file bài hát vào cùng thư mục này và đổi tên thành `audio.mp3`.
2. Mở file `index.html`, thêm thẻ sau vào bên trong thẻ `<body>`:
   ```html
   <audio id="bgMusic" src="audio.mp3" loop preload="auto"></audio>
   ```
3. Mở `script.js`, tìm hàm `toggleMusic` để gọi `document.getElementById('bgMusic').play()`.
*(Hiện tại trang web đã có sẵn bộ sinh giai điệu piano ngọt ngào tự động chạy cực kỳ êm ái mà không sợ lỗi link mạng).*
