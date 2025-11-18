
# Bot_Noti_Strava

## Giới thiệu
Bot_Noti_Strava là một hệ thống bot tích hợp Strava dành cho cộng đồng Mezon, giúp tự động tổng hợp, báo cáo, nhắc nhở và tạo động lực cho các thành viên tham gia hoạt động thể thao. Bot hỗ trợ nhiều bộ môn, lọc/xếp hạng linh hoạt, giao diện báo cáo đẹp, và tích hợp sâu với nền tảng Mezon.

## Tính năng chính
- **Đồng bộ hoạt động Strava**: Tự động nhận webhook, lưu trữ và xử lý dữ liệu hoạt động từ Strava.
- **Báo cáo & xếp hạng**: Cho phép lọc báo cáo theo thời gian, bộ môn, tiêu chí xếp hạng (quãng đường, thời gian, số lần), giới hạn top N, hiển thị bảng xếp hạng đẹp với icon, avatar, link Strava.
- **Nhắc nhở động viên**: Cronjob tự động tag các thành viên chưa có hoạt động, gửi thông điệp động viên sinh động, hỗ trợ tiếng Việt và tiếng Anh.
- **Bảo mật & xác thực**: Hỗ trợ xác thực OAuth2 với Strava, bảo vệ endpoint webhook.
- **Tùy biến linh hoạt**: Cấu hình thời gian cronjob, kênh thông báo, bộ lọc báo cáo qua biến môi trường.

## Công nghệ sử dụng
- Node.js, Express
- SQLite3
- Mezon SDK
- node-cron

## Hướng dẫn cài đặt nhanh
1. Clone repo về máy
2. Cài đặt package: `npm install`
3. Tạo file `.env` theo mẫu và điền các thông tin cần thiết (token, channel, Strava API...)
4. Chạy bot: `npm start`


## Hướng dẫn sử dụng

Sau khi bot đã được cài đặt và chạy thành công trên Mezon, bạn có thể sử dụng các lệnh sau để tương tác:

### Các lệnh chính

- `/ranking` hoặc `bxh` — Xem bảng xếp hạng top thành viên theo tổng thời gian, quãng đường hoặc số lần hoạt động.
- `/report` hoặc `báo cáo` — Mở form lọc báo cáo hoạt động theo bộ môn, thời gian, tiêu chí xếp hạng, số lượng top.
- `/register` — Kết nối tài khoản Strava với Mezon.
- `/myactivity` — Xem hoạt động cá nhân gần nhất.
- `/dailylog` — Ghi nhận hoạt động thủ công nếu không đồng bộ được từ Strava.
- `/help` — Xem hướng dẫn sử dụng bot và các lệnh hỗ trợ.

### Tính năng tự động

- Bot sẽ tự động gửi thông báo động viên vào kênh nhóm nếu phát hiện thành viên chưa có hoạt động trong tuần.
- Báo cáo/xếp hạng có thể được lọc theo nhiều tiêu chí và hiển thị đẹp mắt với icon, avatar, link Strava.

### Lưu ý

- Để sử dụng các lệnh, bạn chỉ cần gõ trực tiếp trong khung chat nhóm hoặc nhấn vào các nút tương tác trên giao diện Mezon.
- Một số lệnh yêu cầu đã kết nối tài khoản Strava.

## Đóng góp
Mọi ý kiến đóng góp, báo lỗi hoặc đề xuất thêm tính năng vui lòng tạo issue hoặc liên hệ trực tiếp qua Mezon.