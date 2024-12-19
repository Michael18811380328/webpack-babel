'use strict';

const isValidEmail = (email) => {
  const reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,6}$/;
  return reg.test(email);
};

console.log(isValidEmail(123));
