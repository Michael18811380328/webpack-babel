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

export const isValidUrl = (url) => {
  const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
  return reg.test(url);
};

export const isValidPosition = (lng, lat) => {
  return (lng || lng === 0) && (lat || lat === 0);
};

export function noop() {

}

export function intBetween(min, max, val) {
  return Math.floor(
    Math.min(max, Math.max(min, val))
  );
}
