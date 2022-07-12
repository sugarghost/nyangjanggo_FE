import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { axiosInstance } from "../../apis/axiosInstance";
import Button from "../../components/Botton";
import InputV2 from "../../components/InputV2";
import ProfileImageUploader from "../../components/mypage/ProfileImageUploader";

const UserEditProfile = () => {
  const [nickname, setNickname] = useState("nickname");
  const [profileImageFile, setProfileImageFile] = useState<any>();

  const handleOnChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleOnClickUserProfileEdit = async () => {
    if (!nickname) {
      alert("닉네임을 입력해 주세요!");
      return;
    }

    const formData = new FormData();

    formData.append("file", profileImageFile);
    formData.append("nickname", nickname);

    // @ts-ignore
    const res = await axios({
      method: "PUT",
      url: `/user`,
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    console.log("유저정보 : ",res)
  };

  useEffect(() => {
    const res = axiosInstance.get("/user");
    console.log(res);
  }, []);

  return (
    <div
      className="bg-secondary-1 min-h-screen bg-white dark:bg-gray-900"
      style={{ padding: "0px 10px" }}
    >
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="max-w-md mx-auto w-full">
          <ProfileImageUploader
            setProfileImageFile={setProfileImageFile}
          ></ProfileImageUploader>

          <InputV2
            inputLabel="닉네임"
            styleCustom={{
              width: "100%",
              height: "45px",
              margin: "20px 0 0 0",
            }}
            value={nickname}
            onChange={handleOnChangeNickname}
          />
          <Button
            onClick={handleOnClickUserProfileEdit}
            styleCustom={{ margin: "10px 0 0 0" }}
          >
            <div>수정하기</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
