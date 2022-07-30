import userApi from '@apis/UserApi';
import { yupResolver } from '@hookform/resolvers/yup';
import PreviewImage from '@images/preview_image.png';
import { UserForm, userValidationSchema } from '@type/userType';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { authInstance } from '../../apis/axiosInstance';
import Button from '../../components/Botton';
import InputV2 from '../../components/InputV2';
import ProfileImageUploader from '../../components/mypage/ProfileImageUploader';
import { COLOR } from '../../constants';

const UserEditProfile = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameOrigin, setNicknameOrigin] = useState('');
  const [userImgUrl, setUserImgUrl] = useState(PreviewImage);
  const [nicnknameValidation, setNicnknameValidation] = useState(false);
  const [nicnknameValidationMessage, setNicnknameValidationMessage] = useState('* 중복 체크를 해주세요!');
  const userDescriptionRef = useRef<any>();
  const [profileImageFile, setProfileImageFile] = useState<any>();
  const navigate = useNavigate();
  const getUserApi = userApi.getUser;
  const putUserApi = userApi.putUser;
  const checkNicknameApi = userApi.checkNickname;

  // 저장 버튼 비활성화 여부를 나누기 위한 상태값
  const [isDisabled, setDisabled] = useState(true);

  const ReactSwal = withReactContent(Swal);

  // 유저 정보 가져오기
  useQuery(['getUser'], async () => getUserApi(), {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setValue('nickname', res.data.nickname);
      setValue('userDescription', res.data.userDescription);
      setNicknameOrigin(res.data.nickname);
      if (res.data.userImg) {
        setUserImgUrl(res.data.userImg);
      }
    },
  });

  // 닉네임 체크
  const { refetch } = useQuery(['checkNickname', nickname], async () => checkNicknameApi(nickname), {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (res) => {
      if (res.data.check === 'true') {
        setNicnknameValidation(true);
      } else {
        setNicnknameValidation(false);
        setNicnknameValidationMessage('닉네임이 중복되었습니다!');
      }
    },
  });
  // 유저 정보 변경
  const putUserMutation = useMutation((addData: FormData) => putUserApi(addData), {
    onSuccess: (res) => {
      navigate('/');
    },
    onError: (e) => {
      ReactSwal.fire({
        title: '<p>개인정보 등록에 실패했습니다!</p>',
        html: '<p>다시 시도해 주세요</p>',
        icon: 'error',
      });
      console.log('putUser Error:', e);
    },
  });

  const userMethods = useForm<UserForm>({
    resolver: yupResolver(userValidationSchema),
    mode: 'onTouched',
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
  } = userMethods;

  const handleOnChangeNickname = async () => {
    await setNickname(getValues('nickname'));
    if (getValues('nickname') === nicknameOrigin) {
      setNicnknameValidation(true);
    } else {
      setNicnknameValidation(false);
      setNicnknameValidationMessage('* 중복 체크를 해주세요!');
    }
  };

  const checkNickname = async () => {
    await setNickname(getValues('nickname'));
    if (getValues('nickname') === nicknameOrigin) {
      setNicnknameValidation(true);
    } else {
      refetch();
    }
  };

  const handleOnClickUserProfileEdit = async (values: UserForm) => {
    const formData = new FormData();

    if (profileImageFile) {
      formData.append('multipartFile', profileImageFile);
    } else {
      formData.append(
        'multipartFile',
        new File([], '', {
          type: 'null',
        }),
      );
    }

    formData.append(
      'userDto',
      new Blob(
        [
          JSON.stringify({
            nickname: values.nickname,
            userDescription: values.userDescription,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    putUserMutation.mutate(formData);
  };

  const onErrorRecipe = (errors: any, e: any) => {
    console.log(errors, e);

    ReactSwal.fire({
      title: '<p>등록 정보가 유효하지 않습니다!</p>',
      html: '<p>다시 시도해 주세요</p>',
      icon: 'error',
    });
  };
  useEffect(() => {
    setValue('userImg', profileImageFile);
  }, [userImgUrl]);

  const watchAll = Object.values(watch());
  useEffect(() => {
    if (
      watch('nickname') !== '' &&
      watch('userDescription') !== '' &&
      !errors.nickname &&
      !errors.userDescription &&
      !errors.userImg &&
      nicnknameValidation
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watchAll, nicnknameValidation]);

  return (
    <div className="mx-auto w-full min-h-screen">
      <form onSubmit={handleSubmit(handleOnClickUserProfileEdit, onErrorRecipe)}>
        <ProfileImageUploader setProfileImageFile={setProfileImageFile} userImgUrl={userImgUrl} />
        <div className="flex mt-6">
          <NicknameInput
            placeholder="닉네임"
            validationCheck={!!errors.nickname}
            {...register('nickname', { required: true, max: 20 })}
            onChange={handleOnChangeNickname}
          />
          <NicknameButton className="m-auto" type="button" onClick={checkNickname} value="중복 확인" />
        </div>
        {errors.nickname ? (
          <ValidationMessage>{errors.nickname.message}</ValidationMessage>
        ) : !nicnknameValidation ? (
          <ValidationMessage>{nicnknameValidationMessage}</ValidationMessage>
        ) : (
          ''
        )}

        <ContentTextarea
          placeholder="자기 소개를 입력해주세요!"
          rows={6}
          validationCheck={!!errors.userDescription}
          ref={userDescriptionRef}
          {...register('userDescription', { required: true, max: 1000 })}
        />
        {errors.userDescription && <ValidationMessage>{errors.userDescription.message}</ValidationMessage>}

        <SaveButton type="submit" disabled={isDisabled}>
          <div>등록하기</div>
        </SaveButton>
      </form>
    </div>
  );
};

const SaveButton = styled.button`
  border-radius: 0.375rem;
  height: 2.5rem;
  width: 100%;
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
  --tw-bg-opacity: 1;
  background-color: rgba(235, 49, 32, var(--tw-bg-opacity));
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;

  &:disabled {
    background-color: rgba(154, 154, 154, var(--tw-bg-opacity));
  }
`;

const ValidationMessage = styled.p`
  text-align: left;
  font-size: 12px;
  color: #eb3120;
  font-weight: normal;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
`;

const NicknameInput = styled.input<any>`
  padding: 1rem;
  margin: auto;
  margin-left: 0;
  width: 80%;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: ${(props) => (props.validationCheck ? '#EB3120' : '#D1D5DB')}; ;
`;

const NicknameButton = styled.input`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: auto;
  margin-right: 0;
  float: right;
  border-radius: 0.375rem;
  width: 20%;
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
  --tw-bg-opacity: 1;
  background-color: rgba(235, 49, 32, var(--tw-bg-opacity));
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
`;

const ContentTextarea = styled.textarea<any>`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: ${(props) => (props.validationCheck ? '#EB3120' : '#D1D5DB')}; ;
`;

export default UserEditProfile;
