import { FILEEXT_ICON_MAP, isValidEmail, isValidUrl, isValidPosition } from './utils.js';

function main() {
  console.log(FILEEXT_ICON_MAP);
  let a = isValidEmail("a@1.com");
  let b = isValidUrl('1@1.com');
  console.log(isValidPosition(120, 80));
  return a && b;
}

main();
