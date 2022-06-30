import React, { useState } from "react";
import styled from "styled-components";

import InputV2 from "../components/InputV2";
import Textarea from "../components/Textarea";

const RecipeRegisterPage = () => {
  const [mainImage, setMainImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2020/6/17/1592363657269_0.jpg"
  );

  return (
    <>
      <div className="bg-secondary-1 flex min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="max-w-md mx-auto w-full">
            <MainImgWrapperLabel>요리 메인 페이지</MainImgWrapperLabel>
            <MainImgWrapper className="img-render" src={mainImage} />
            <InputV2
              inputLabel={"요리 이름"}
              onChange={() => {}}
              styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
            />

            <Textarea
              inputLabel={"요리 설명"}
              onChange={() => {}}
              styleCustom={{ width: "100%", margin: "20px 0 0 0" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeRegisterPage;

const MainImgWrapperLabel = styled.div`
  text-align: left;
`;

const MainImgWrapper = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-top: 10px;
`;
