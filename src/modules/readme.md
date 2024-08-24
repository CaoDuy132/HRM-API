<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Mô tả
Chứa toàn bộ các `modules` tính năng của dự án
## Thư mục
- Tên module
  - DTO
  - entities
  - module
  - controller
  - services
  - testing
## Chức năng từng thư mục
#### DTO (Data Transfer Object)
Được sử dụng để `quy định rõ dữ liệu` mà một endpoint cần hoặc trả về
#### Entities
`Đại diện cho các đối tượng trong cơ sở dữ liệu và được sử dụng để tương tác với dữ liệu` của ứng dụng thông qua cơ sở dữ liệu.
#### [Module](https://docs.nestjs.com/modules)
Dùng để `sắp xếp những code có liên quan cho một tính năng cụ thể`, giữ cho code có tổ chức và thiết lập các ranh giới rõ ràng.
#### [Controller](https://docs.nestjs.com/controllers)
`Bộ điều khiển chịu trách nhiệm xử lý các yêu cầu` đến và trả lại phản hồi cho một request.
#### [Services](https://docs.nestjs.com/providers)
`Chịu trách nhiệm lưu trữ và truy xuất dữ liệu và xử lý logic` được Controller sử dụng trả kết quả cho một request 
#### [Testing](https://docs.nestjs.com/fundamentals/testing)
`Dùng để viết các bài kiểm thử tự động` trong quá trình phát triển một tính năng

## [Sử dụng CLI Command](https://docs.nestjs.com/cli/usages)
#### Tạo Module
```base
nest g module [name]
```

#### Tạo Controller
```base
nest g controller [name]
```

#### Tạo Service
```base
nest g service [name]
```

#### Tạo nhanh CRUD
```base
nest g res [module name]
```


#### Note
Nếu muốn tạo trong một thư mục thì thêm tên thư mục phía trước name </br>
Ví dụ muốn tạo trong thư mục `modules`<br>
#### Tạo module:
`nest g module modules/[name]`
#### Tạo Controller:
`nest g controller modules/[name]`
#### Tạo Service:
`nest g service modules/[name]`
#### Tạo nhanh CRUD
`nest g res modules/[module name]`





