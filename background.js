// Hàm này chạy một lần khi extension được cài đặt hoặc cập nhật
chrome.runtime.onInstalled.addListener(() => {
  createEmojiIcon();
});

// Hàm này cũng chạy mỗi khi trình duyệt khởi động
chrome.runtime.onStartup.addListener(() => {
  createEmojiIcon();
});

function createEmojiIcon() {
  // --- BẠN CÓ THỂ THAY ĐỔI EMOJI Ở ĐÂY ---
  const emoji = '⚙️'; // Ví dụ: 🔧, 🚀, ⚡️, 🤖
  // ------------------------------------

  const size = 128;
  const canvas = new OffscreenCanvas(size, size);
  const context = canvas.getContext('2d');

  // Căn giữa emoji trên canvas
  context.font = '100px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  
  // Vẽ emoji
  context.fillText(emoji, size / 2, size / 2 + 8); // Tinh chỉnh +8 để cân đối hơn

  // Lấy dữ liệu ảnh từ canvas
  const imageData = context.getImageData(0, 0, size, size);

  // Đặt làm icon cho extension
  chrome.action.setIcon({ imageData: imageData }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      console.log('Emoji icon set successfully!');
    }
  });
}
