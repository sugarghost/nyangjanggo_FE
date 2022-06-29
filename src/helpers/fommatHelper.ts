export const phoneNumberFormatter = (nationalCode: string, phoneNumber: string) => {

  if (phoneNumber.toString().substr(0, 1) === "0") {
    phoneNumber =  phoneNumber.substr(1);
  }

  return nationalCode + phoneNumber;
};


export const emailFormatter = (email:string, emailDomain:string) => {

  if (emailDomain.substr(0, 1) !== "@") {
    emailDomain = "@" + emailDomain;
  }

  return email + emailDomain;
};