import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface IProps {
  setProfileImageFile?: any;
  userImgUrl?: string;
}

function ProfileImageUploader(props: IProps) {
  const { setProfileImageFile, userImgUrl } = props;

  const [fileImage, setFileImage] = useState('');
  const fileRef = useRef<any>();
  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
    // @ts-ignore
    setProfileImageFile(event.target.files[0]);
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('');
  };

  // 이미지 클릭 시 Click 이벤트를 연결된 input 요소로 옮겨줌
  const imageClick = () => {
    fileRef.current.click();
  };
  // props으로 전달되는 userImgUrl을 바로 할당하면 오류가 나서 한번 렌더링을 거침
  useEffect(() => {
    setFileImage(userImgUrl);
  }, [userImgUrl]);
  return (
    <>
      <h1>이미지 업로드 </h1>
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input name="imggeUpload" type="file" accept="image/*" onChange={saveFileImage} ref={fileRef} hidden />
      </div>
      <ProfileImageWrapper
        alt=""
        src={fileImage}
        className="img-render"
        style={{ margin: 'auto' }}
        onClick={imageClick}
      />
    </>
  );
}
export default ProfileImageUploader;

const ProfileImageWrapper = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 50px auto 0 auto;
  border-radius: 100px;
  cursor: pointer;
`;
