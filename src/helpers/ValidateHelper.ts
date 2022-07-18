export const validateEmail = (email: string) => {
  const regularExpression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
};

/**
 * 6-20자리 영어 소문자 포함, 특수문자 제외
 */
// export const validateUserIdV2 = userId => {
//   const regularExpression = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
//   return regularExpression.test(String(userId).toLowerCase());
// };

// 영문 소문자만 포함가능
export const validateUserIdV2 = (userId: string) => {
  const regularExpression = /^[a-zA-Z0-9]{5,20}$/g;
  return regularExpression.test(String(userId).toLowerCase());
};

/**
 * 6-20자리 영어 대,소문자 포함,
 * and숫자 또는 특수문자 필수
 */
export const validateUserId = (userId: string) => {
  const regularExpression = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,16}$/;
  return regularExpression.test(String(userId).toLowerCase());
};

export const validatePasswordV2 = (password: string) => password.match(/.{8,16}/);

/**
 * 8-20자리 영어 대,소문자 포함,
 * and숫자 또는 특수문자 필수
 */
export const validatePassword = (password: string) => {
  const regularExpression = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;
  return regularExpression.test(String(password).toLowerCase());
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const regularExpression = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
  return Boolean(phoneNumber.match(regularExpression));
};

// 000-0000-0000 farmat
export const phoneFormat = (phoneNumber: string) => phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

export const validateBusinessNumber = (phoneNumber: string) => {
  const regularExpression = /^[0-9]{3}[-]+[0-9]{2}[-]+[0-9]{5}$/;
  return Boolean(phoneNumber.match(regularExpression));
};

export const validateBlank = (value: string) => {
  if (value) {
    return true;
  }
  return false;
};

export const validateNumber = (value: number) => {
  if (isNaN(value)) {
    return false;
  }
};

export const autoHypenPhone = (str: string) => {
  str = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (str.length < 4) {
    return str;
  }
  if (str.length < 7) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  }
  if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  }
  tmp += str.substr(0, 3);
  tmp += '-';
  tmp += str.substr(3, 4);
  tmp += '-';
  tmp += str.substr(7);
  return tmp;

  return str;
};
