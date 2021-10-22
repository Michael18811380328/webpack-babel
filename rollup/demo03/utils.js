export const FILEEXT_ICON_MAP = {
  // text file
  'md': 'txt.png',
  'txt': 'txt.png',
  // default
  'default' : 'file.png'
};

export const isValidEmail = (email) => {
  const reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,6}$/;
  return reg.test(email);
};

// 这里测试没有导出的函数，看是否有 tree-shaking
// 这部分没有使用的代码，以及注释，都没有在打包文件中
// rollup 自动实现了这个功能
const isValidUrl = (url) => {
  const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
  return reg.test(url);
};

const isValidPosition = (lng, lat) => {
  return (lng || lng === 0) && (lat || lat === 0);
};

export function noop() {

}

function intBetween(min, max, val) {
  return Math.floor(
    Math.min(max, Math.max(min, val))
  );
}
