
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Mô tả
Chứa các thành phần được sử dụng để `cấu hình cho toàn bộ dự án`

## Thư mục

- [Databases](https://docs.nestjs.com/techniques/database)
```base
Chứa những cấu hình về database của dự án
```
- Migrations
```base
Chứa những file quản lý, triển khai các thay đổi cấu trúc của database một cách tự động

cách tạo:
npm run migration:create --name=[fileName]

cách chạy:
npm run migration:up

cách revert (production không xài):
npm run migration:down

```



