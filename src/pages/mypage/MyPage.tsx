import userApi from '@apis/UserApi';
import PreviewImage from '@images/preview_image.png';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function MyPage() {
  const navigate = useNavigate();

  const getUserApi = userApi.getUser;

  const ReactSwal = withReactContent(Swal);

  // 유저 정보 가져오기
  useQuery(['getUser'], async () => getUserApi(), {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setNickName(res.data.nickname);
      if (res.data.userImg) {
        setProfileImage(res.data.userImg);
      }
      setUserDescription(res.data.userDescription);
    },
  });

  const goMyRefrigeratorPage = () => {
    navigate('/myPage/myRefrigeratorPage');
  };

  const goUserEditPage = () => {
    navigate('/myPage/userEditPage');
  };

  const [profileImage, setProfileImage] = useState(PreviewImage);
  const [nickNameImage, setNickName] = useState('닉네임');
  const [userDescription, setUserDescription] = useState('자기소개');

  const handleOnClickLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="mx-auto w-full min-h-screen">
      <UserMainInfoWrapper className="">
        <ProfileImage className="img-render" src={profileImage} />
        <ProfileInfo>
          <div style={{ fontWeight: 'bold', fontSize: '24px' }} className="text-aling-left">
            {nickNameImage}
          </div>
          <div style={{ margin: '5px 0 0 0' }} className="text-aling-left">
            {userDescription}
          </div>
        </ProfileInfo>
      </UserMainInfoWrapper>
      <div style={{ width: '100%', height: '12px', background: '#E2E2E2' }} />
      <OptionsWrapper>
        <OptionBox onClick={goUserEditPage}>정보 수정</OptionBox>
        <OptionBox onClick={goMyRefrigeratorPage} className="">
          냉장고
        </OptionBox>
        {/* <OptionBox className="">이건뭘까</OptionBox> */}
      </OptionsWrapper>
      <LogOutButton onClick={handleOnClickLogOut}>로그아웃</LogOutButton>
    </div>
  );
}

export default MyPage;

const UserMainInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 28px 15px;
`;

const ProfileImage = styled.img`
  width: 87px;
  height: 87px;
  border-radius: 3px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0 0 15px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #e2e2e2;
  cursor: pointer;
  font-size: 15px;
`;

const LogOutButton = styled.div`
  margin: 13px 0 0 0;
  font-size: 14px;
  opacity: 0.7;
  cursor: pointer;
`;
