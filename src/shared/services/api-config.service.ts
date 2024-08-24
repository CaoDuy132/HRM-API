import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isDocumentationEnabled(): boolean {
    return !this.isProduction;
  }

  private getNumber(key: string, throwIfMissing = false): number {
    const value = this.get(key, throwIfMissing);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string, throwIfMissing = false): boolean {
    const value = this.get(key, throwIfMissing);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string, throwIfMissing = false): string {
    const value = this.get(key, throwIfMissing);
    return value?.replace('\\n', '\n').trim();
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get jwt() {
    return {
      jwt_token: this.getString('JWT_TOKEN', true),
      token_expiration_time: this.getString('TOKEN_EXPIRATION_TIME', true),
    };
  }
  get IpConfig() {
    return {
      check: this.getBoolean('IS_CHECK_IP'),
    };
  }
  get mail() {
    return {
      clientId: this.getString('MAIL_CLIENT_ID'),
      clientSecret: this.getString('MAIL_CLIENT_SECRET'),
      redirectUri: this.getString('MAIL_REDIRECT_URI'),
      refreshToken: this.getString('MAIL_REFRESH_TOKEN'),
      userMail: this.getString('MAIL_USER_MAIL'),
      host: this.getString('MAIL_HOST'),
      port: Number(this.getString('MAIL_PORT')) || 465,
      isSecure: this.getString('MAIL_IS_SECURE') === 'true' ? true : false,
      type: this.getString('MAIL_MAIL_TYPE'),
    };
  }

  get appConfig() {
    return {
      PORT: this.getString('APP_PORT'),
      API_PREFIX: this.getString('API_PREFIX') || 'api',
    };
  }

  private get(key: string, throwIfMissing = false): string {
    const value = this.configService.get<string>(key);
    if (throwIfMissing && isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
