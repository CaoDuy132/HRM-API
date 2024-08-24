/**
 * Function kiểm tra quyền
 * @param listFeature: Danh sách quyền của người dùng
 * @param condition: Quyền yêu cầu
 * @returns boolean
 */
export function checkPermission(listFeature: string[], condition: string) {
  if (listFeature.indexOf(condition) > -1) {
    return true;
  } else {
    return false;
  }
}
