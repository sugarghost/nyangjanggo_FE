import React, { useState } from "react";
import styled from "styled-components";

const MyRefrigeratorPage = () => {
  const [profileImage, setProfileImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg"
  );

  return (
    <>
      <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="max-w-md mx-auto w-full">
            <OptionsWrapper className="min-width-400">
              <IngredientsBox className="">
                <div>
                  06/01 <span style={{margin: "0 0 0 20px"}}>달걀(6개)</span>
                </div>
                <div>10일 남음</div>
              </IngredientsBox>
            </OptionsWrapper>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRefrigeratorPage;

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

const IngredientsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  border: 1px solid grey;
  margin: 5px 0 0 0;
  pointer: cursor;
`;
