import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { google } from 'googleapis';
import { TEMPLATE } from './utils/constant';
import { BadRequestException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/error-code';
import nodemailer = require('nodemailer');
import path = require('path');
import { FileHelper } from 'src/common/helpers/file.helpers';

@Injectable()
export class GoogleCloudService {
  private readonly host: string;
  private readonly port: number;
  private readonly secure: boolean;
  private template: string;
  private templateValue: any;
  private readonly baseUrl: string;
  private readonly defaultEmail: string;
  private subject: string;
  private readonly auth: {
    type: string;
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    accessToken: string | null;
  };
  private userReceivers: any[];
  private userMentions: any[];
  private readonly client: any;

  constructor(private readonly apiConfigService: ApiConfigService) {
    this.host = this.apiConfigService.mail.host;
    this.port = this.apiConfigService.mail.port;
    this.secure = this.apiConfigService.mail.isSecure;
    this.template = TEMPLATE.WELCOME;
    this.templateValue = null;
    this.baseUrl = './template/';
    this.defaultEmail = this.apiConfigService.mail.userMail;
    this.subject = 'Thông báo từ Di Động Việt';
    this.auth = {
      type: this.apiConfigService.mail.type,
      user: this.apiConfigService.mail.userMail,
      clientId: this.apiConfigService.mail.clientId,
      clientSecret: this.apiConfigService.mail.clientSecret,
      refreshToken: this.apiConfigService.mail.refreshToken,
      accessToken: null,
    };
    this.userReceivers = [];
    this.userMentions = [];

    const client = new google.auth.OAuth2(
      this.apiConfigService.mail.clientId,
      this.apiConfigService.mail.clientSecret,
      this.apiConfigService.mail.redirectUri,
    );
    client.setCredentials({
      refresh_token: this.apiConfigService.mail.refreshToken,
    });
    this.client = client;
  }

  validateTemplate(template) {
    if (!template) {
      throw new BadRequestException(ErrorCode.AUTH_MAIL_MISSING_TEMPLATE);
    }
    return Object.keys(TEMPLATE).includes(template);
  }

  setTemplate(template) {
    this.template = template.includes('html') ? template : `${template}.html`;
    return this;
  }

  setTemplateValue(value) {
    this.templateValue = value || {};
    return this;
  }

  setSubject(subject) {
    this.subject = subject ? subject.trim() : '';
    return this;
  }

  setUserReceivers(users) {
    if (!users || !users.length) {
      throw new BadRequestException(ErrorCode.AUTH_MAIL_MISSING_USER_MAIL);
    }
    this.userReceivers = users.filter((user) => user);
    return this;
  }

  createTransport(accessToken) {
    if (!accessToken) {
      throw new BadRequestException(ErrorCode.AUTH_ACCESS_TOKEN_IN_VALID);
    }
    return nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.secure,
      auth: {
        ...this.auth,
        accessToken: accessToken,
      },
    });
  }

  _getAccessToken() {
    return this.client.getAccessToken();
  }

  async configTransport() {
    const accessToken = await this._getAccessToken();
    return this.createTransport(accessToken);
  }

  _optionMailer({
    subject = this.subject,
    receivers = [],
    text = null,
    html = null,
  }) {
    const receiver = receivers.filter((receiver) => receiver);
    if (!receiver || !receiver.length) {
      throw new BadRequestException(ErrorCode.AUTH_MAIL_MISSING_RECIEVER_MAIL);
    }
    return {
      from: '',
      to: receiver.join(';'),
      subject: subject,
      text: text,
      html: html,
    };
  }

  async getTemplete(template) {
    if (!template) {
      throw new BadRequestException(ErrorCode.AUTH_MAIL_MISSING_TEMPLATE);
    }
    const filePath = path.join(__dirname, this.baseUrl + template);
    const html = await FileHelper.readFileAsync(filePath);
    return html.toString();
  }

  async send(
    data = {
      receivers: this.userReceivers,
      mentions: this.userMentions,
      html: '',
    },
  ) {
    let html = await this.getTemplete(this.template);
    if (this.templateValue) {
      for (const [key, value] of Object.entries(this.templateValue)) {
        const regExp = new RegExp(`{${key}}`, 'g');
        if (html.match(regExp)) {
          html = html.replace(regExp, String(value) || '');
        }
      }
    }
    const reqExpBacket = new RegExp(/{+[\S]+}/, 'gm');
    html = html.replace(reqExpBacket, '');
    data.html = html;
    const sender = await this.configTransport();
    const option = this._optionMailer(data);
    return sender.sendMail(option);
  }
}
