/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2026-01-13 13:51:39
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-01-13 15:33:43
 * @FilePath: \workingspace\image-collection-notes\utils\computeFileSize.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 计算文件大小
 * @param originalSize 基础单位默认为Byte
 */
export function computeFileSize(originalSize) {
  if (isNaN(originalSize) || originalSize < 0) return "0 kb";

  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let index = 0;
  while (originalSize >= 1024 && index < units.length - 1) {
    originalSize /= 1024;
    index++;
  }
  return `${originalSize.toFixed(2)} ${units[index]}`;
}
