import * as yup from 'yup';

export type UserInfo = {
  nickname: string;
  userImg: string;
  userDescription: string;
};

export type UserForm = {
  nickname: string;
  userImg: any;
  userDescription: string;
};

export const userValidationSchema = yup.object().shape({
  nickname: yup.string().max(20, '* 닉네임을 20자 이내로 입력해 주세요').required('* 닉네임을 입력해 주세요'),
  userDescription: yup
    .string()
    .max(1000, '* 자기소개를 1000자 이내로 입력해 주세요')
    .required('* 자기소개를 입력해 주세요'),
  userImg: yup.mixed(),
});
