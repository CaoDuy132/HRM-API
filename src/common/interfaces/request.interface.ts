import { Request } from 'express';
import { User } from 'src/modules/user/entities/user.entity';

/**
 * @description Mở rộng giao diện Request của Express để bao gồm các thuộc tính bổ sung.
 * @interface RequestExpress
 * @extends {Request}
 * @property {User} user - Người dùng đã xác thực đang thực hiện yêu cầu.
 * @property {number} merchantId - ID của merchant đang thực hiện yêu cầu.
 */
export interface RequestExpress extends Request {
  user: User;
  merchantId: number;
  storeId: number;
}
