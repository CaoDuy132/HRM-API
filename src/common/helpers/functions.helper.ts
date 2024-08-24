import * as _ from 'lodash';

export const getPagination = (page, size) => {
  size = _.toNumber(size) || 10;
  page = _.toNumber(page) || 1;
  return {
    limit: size,
    offset: 0 + (page - 1) * size,
  };
};

export const getPaginateData = (data, page, limit) => {
  const [rows, total] = data;

  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(total / limit);

  return { total, rows, totalPages, currentPage };
};

export const compareNomalizeString = (source: string, target: string) => {
  return (
    source.trim().toLowerCase().normalize() ===
    target.trim().toLowerCase().normalize()
  );
};

export const replaceDateRegex = (date, format = '-') => {
  return date
    ? date.replace(/\//g, format).replace(/-/g, format).replace(/\\/g, format)
    : null;
};

export const checkSpecialCharacters = (string) => {
  if (!string || !string.trim()) return false;

  const regexSpecialCharacters = /[\s~`!@#$%^&*+=[\]\\';,/{}|\\":<>?()._]/g;
  const normalizedString = string.normalize().trim();
  return regexSpecialCharacters.test(normalizedString);
};

export const checkAscent = (string) => {
  if (!string || !string.trim()) return false;

  const regexAscent = genMultilineRegexp(
    [
      'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ',
      '|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ',
      '|ì|í|ị|ỉ|ĩ',
      '|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ',
      '|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ',
      '|ỳ|ý|ỵ|ỷ|ỹ',
      '|đ',
    ],
    'g',
  );

  return regexAscent.test(string);
};

export const genMultilineRegexp = (patterns, joinWith = '', flag = 'g') => {
  const regexpAsStringLiteral = patterns.join(joinWith);
  return new RegExp(regexpAsStringLiteral, flag);
};

export const isPhoneNumber = (phone) => {
  // const vietnamesePhoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-9]|9[0-4|6-9])[0-9]{7}$/;
  const vietnamesePhoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return phone.match(vietnamesePhoneRegex);
};

export const catchNum = (data) => {
  let result = 0;
  if (data) {
    result = isNaN(data) ? 0 : parseInt(data);
  }
  return result;
};

export const removeAccents = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};
