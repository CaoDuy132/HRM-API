import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constant';

export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
