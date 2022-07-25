import userApi from '@apis/UserApi';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
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
  const [userImgUrl, setUserImgUrl] = useState('');
  const userDescriptionRef = useRef<any>();
  const [profileImageFile, setProfileImageFile] = useState<any>();
  const navigate = useNavigate();
  const getUserApi = userApi.getUser;
  const putUserApi = userApi.putUser;

  const ReactSwal = withReactContent(Swal);

  // 유저 정보 가져오기
  useQuery(['getUser'], async () => getUserApi(), {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      console.log('getUser', res.data);
      setNickname(res.data.nickname);
      setUserImgUrl(res.data.userImg);
      userDescriptionRef.current.value = res.data.userDescription;
    },
  });
  // 유저 정보 변경
  const putUserMutation = useMutation((addData: FormData) => putUserApi(addData), {
    onSuccess: (res) => {
      console.log('putUser :', res);
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

  const handleOnChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleOnClickUserProfileEdit = async () => {
    if (!nickname) {
      alert('닉네임을 입력해 주세요!');
      return;
    }
    if (!userDescriptionRef?.current.value) {
      alert('자기소개를 입력해 주세요!');
      return;
    }

    const formData = new FormData();

    formData.append('multipartFile', profileImageFile);
    formData.append(
      'userDto',
      new Blob(
        [
          JSON.stringify({
            nickname,
            userDescription: userDescriptionRef.current.value,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    putUserMutation.mutate(formData);
  };

  return (
    <div className="bg-secondary-1 min-h-screen bg-white dark:bg-gray-900" style={{ padding: '0px 10px' }}>
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="max-w-md mx-auto w-full">
          <ProfileImageUploader setProfileImageFile={setProfileImageFile} userImgUrl={userImgUrl} />
          <InputV2
            inputLabel="닉네임"
            styleCustom={{
              width: '100%',
              height: '45px',
              margin: '20px 0 0 0',
            }}
            value={nickname}
            onChange={handleOnChangeNickname}
          />

          <textarea
            className="p-4 my-4 w-full rounded-md border border-gray-300"
            placeholder="자기 소개를 입력해주세요!"
            rows={6}
            ref={userDescriptionRef}
          />

          <Button onClick={handleOnClickUserProfileEdit} styleCustom={{ background: COLOR.MAIN, margin: '10px 0 0 0' }}>
            <div>수정하기</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
