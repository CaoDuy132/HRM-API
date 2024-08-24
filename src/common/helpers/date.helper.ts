import * as moment from 'moment';
import { DATE_FORMAT } from '../constant';

export class DateHelper {
  static currentTimeAsString(format = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment().format(format);
  }

  static convertTimeAsString = (
    date: moment.MomentInput,
    format = 'YYYY-MM-DD HH:mm:ss',
  ): string => {
    const isDate = date ? moment(date).isValid() : false;
    return isDate ? moment(date).format(format) : null;
  };

  static currentTimeAsDate(): Date {
    return moment().toDate();
  }

  static convertTimeAsDate = (dateString: string): Date => {
    const isDate = dateString ? moment(dateString).isValid() : false;
    return isDate ? moment(dateString).toDate() : null;
  };

  static convertTimestampToDateTime = (
    timestamp: number,
    format: string = DATE_FORMAT,
  ): string => {
    const isValidTime = moment.unix(timestamp).isValid();
    return isValidTime ? moment.unix(timestamp).format(format) : null;
  };
}
