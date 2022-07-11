import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPage = () => {
  const navigate = useNavigate();
  const goMyRefrigeratorPage = () => {
    navigate("/myPage/myRefrigeratorPage");
  };

  const [profileImage, setProfileImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg"
  );

  return (
    <>
      <div className="bg-secondary-1 min-h-screen bg-white dark:bg-gray-900" style={{padding: "0px 10px"}}>
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="max-w-md mx-auto w-full">
            <UserMainInfoWrapper className="min-width-400">
              <ProfileImage className="img-render" src={profileImage} />
              <ProfileInfo>
                <div
                  style={{ fontWeight: "bold", fontSize: "24px" }}
                  className="text-aling-left"
                >
                  닉네임
                </div>
                <div
                  style={{ margin: "5px 0 0 0" }}
                  className="text-aling-left"
                >
                  뭐들어가지
                </div>
              </ProfileInfo>
            </UserMainInfoWrapper>
            <OptionsWrapper>
              <OptionBox className="">내 정보</OptionBox>
              <OptionBox onClick={goMyRefrigeratorPage} className="">
                냉장고
              </OptionBox>
              <OptionBox className="">이건뭘까</OptionBox>
            </OptionsWrapper>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;

const UserMainInfoWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 15px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0 0 0;
`;

const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  border: 1px solid grey;
  margin: 5px auto 0 auto;
  cursor: pointer;
`;
