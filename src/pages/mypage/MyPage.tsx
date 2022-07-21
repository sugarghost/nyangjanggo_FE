import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR } from '../../constants';

function MyPage() {
  const navigate = useNavigate();
  const goMyRefrigeratorPage = () => {
    navigate('/myPage/myRefrigeratorPage');
  };

  const goUserEditPage = () => {
    navigate('/myPage/userEditPage');
  };

  const [profileImage, setProfileImage] = useState('https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg');

  const handleOnClickLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="bg-secondary-1 min-h-screen bg-white dark:bg-gray-900" style={{ padding: '0px 0px' }}>
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="max-w-md mx-auto w-full">
          <UserMainInfoWrapper className="min-width-400">
            <ProfileImage className="img-render" src={profileImage} />
            <ProfileInfo>
              <div style={{ fontWeight: 'bold', fontSize: '24px' }} className="text-aling-left">
                닉네임
              </div>
              <div style={{ margin: '5px 0 0 0' }} className="text-aling-left">
                뭐들어가지
              </div>
            </ProfileInfo>
          </UserMainInfoWrapper>
          <div style={{ width: '100%', height: '12px', background: COLOR.GRAY1 }} />
          <OptionsWrapper>
            <OptionBox onClick={goUserEditPage}>정보 수정</OptionBox>
            <OptionBox onClick={goMyRefrigeratorPage} className="">
              냉장고
            </OptionBox>
            {/* <OptionBox className="">이건뭘까</OptionBox> */}
          </OptionsWrapper>
          <LogOutButton onClick={handleOnClickLogOut}>로그아웃</LogOutButton>
        </div>
      </div>
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
  border: 1px solid ${COLOR.GRAY1};
  cursor: pointer;
  font-size: 15px;
`;

const LogOutButton = styled.div`
  margin: 13px 0 0 0;
  font-size: 14px;
  opacity: 0.7;
  cursor: pointer;
`;
