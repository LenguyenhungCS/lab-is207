// ==========================================
// A. FORM VALIDATION
// ==========================================

function validateForm(event) {
  event.preventDefault(); // Ngăn form submit mặc định
  
  // Xóa các thông báo lỗi cũ
  clearErrors();
  
  let isValid = true;
  
  // Lấy giá trị từ form
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Kiểm tra tên không được để trống
  if (name === '') {
    showError('name', 'Tên không được để trống!');
    isValid = false;
  }
  
  // Kiểm tra email đúng định dạng
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError('email', 'Email không được để trống!');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Email không đúng định dạng! Vui lòng nhập email hợp lệ (ví dụ: name@example.com)');
    isValid = false;
  }
  
  // Kiểm tra tin nhắn ít nhất 10 ký tự
  if (message === '') {
    showError('message', 'Tin nhắn không được để trống!');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'Tin nhắn phải có ít nhất 10 ký tự!');
    isValid = false;
  }
  
  // Nếu tất cả hợp lệ
  if (isValid) {
    alert('Gửi thông tin thành công! Cảm ơn bạn đã liên hệ.');
    document.getElementById('contact-form').reset();
  }
  
  return false;
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorP = document.createElement('p');
  errorP.className = 'error';
  errorP.textContent = message;
  field.parentNode.appendChild(errorP);
  field.style.borderColor = '#ff0000';
}

function clearErrors() {
  // Xóa tất cả thông báo lỗi
  const errors = document.querySelectorAll('.error');
  errors.forEach(error => error.remove());
  
  // Reset border color
  const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
  inputs.forEach(input => input.style.borderColor = '');
}

// ==========================================
// B. XỬ LÝ CHECKBOX "HOÀN THÀNH MỤC TIÊU"
// ==========================================

function handleGoalCheckbox(checkbox) {
  // Lấy hàng (row) chứa checkbox
  const row = checkbox.closest('tr');
  
  if (checkbox.checked) {
    // Khi tick: đổi màu nền và gạch ngang chữ
    row.style.backgroundColor = '#c6f5c6';
    row.style.textDecoration = 'line-through';
  } else {
    // Khi bỏ tick: khôi phục trạng thái ban đầu
    row.style.backgroundColor = '';
    row.style.textDecoration = '';
  }
}

// ==========================================
// C. HIỆU ỨNG
// ==========================================

// 1. Hiệu ứng phóng to ảnh đại diện khi hover
function setupImageHoverEffect() {
  const profileImage = document.querySelector('#gioi-thieu img');
  
  if (profileImage) {
    profileImage.onmouseover = function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.3s ease';
      this.style.border = '3px solid #CAEDFF';
      this.style.borderRadius = '10px';
      this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    };
    
    profileImage.onmouseout = function() {
      this.style.transform = 'scale(1)';
      this.style.border = 'none';
      this.style.boxShadow = 'none';
    };
  }
}

// 2. Nút "Lên đầu trang"
function createBackToTopButton() {
  // Tạo nút
  const button = document.createElement('button');
  button.id = 'back-to-top';
  button.innerHTML = '↑ Lên đầu trang';
  button.style.display = 'none';
  document.body.appendChild(button);
  
  // Xử lý sự kiện scroll
  window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  };
  
  // Xử lý click nút
  button.onclick = function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
}

// ==========================================
// KHỞI TẠO KHI TRANG TẢI XONG
// ==========================================

window.onload = function() {
  // Thiết lập form validation
  const form = document.getElementById('contact-form');
  if (form) {
    form.onsubmit = validateForm;
  }
  
  // Thiết lập hiệu ứng ảnh
  setupImageHoverEffect();
  
  // Tạo nút back to top
  createBackToTopButton();
  
  // Thiết lập xử lý checkbox cho bảng mục tiêu
  const goalCheckboxes = document.querySelectorAll('.goals-table input[type="checkbox"]');
  goalCheckboxes.forEach(checkbox => {
    checkbox.onchange = function() {
      handleGoalCheckbox(this);
    };
  });
};

