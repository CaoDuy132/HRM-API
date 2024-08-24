
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# Mô tả

Chứa các `thành phần, mã nguồn được sử dụng chung` trong toàn bộ project

## Thư mục

- Constants
```base
Lưu các biến môi trường được sử dụng chung 
được sử dụng trong toàn bộ quá trình
Ví dụ: 
- API URL THIRD PARTY
- Magic number
...
```
- [Decoraters](https://docs.nestjs.com/custom-decorators)
```base
Lưu các decoraters custom thêm để hỗ trợ 
cho các function
```
- Enum
```base
Lưu các giá trị cố định mà một đối tượng có thể nhận
Ví dụ:
export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}
```
- Error code
```base
Lưu các text thông báo lỗi cho FE
```


- [Exception Filters](https://docs.nestjs.com/websockets/exception-filters)
```base
Chứa những lớp chuyên xử lý các ngoại lệ (Exceptions)
```

- [Guards](https://docs.nestjs.com/guards)
```base
Chứa những lớp bảo vệ trước khi vào một router 
hoặc một hàm xử lí một request
```


- Helpers
```base
Chứa những function hỗ trợ nhỏ được tái sử dụng ở nhiều nơi
Ví dụ:
- Hàm chuyển đổi định dạng ngày tháng
- Hàm xử lý chuỗi
...
```


- Services
```base
Chứa những chức năng của những third party được tái sử dụng ở nhiều nơi
Ví dụ: 
 + Redis (caching)
    - Hàm set,get,delete cache
 + RabbitMQ (Message Queue)
    - Hàm pub, sub Message Queue
```



