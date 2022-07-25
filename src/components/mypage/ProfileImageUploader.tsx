import React, { useState } from 'react';
import styled from 'styled-components';

interface IProps {
  setProfileImageFile?: any;
  userImgUrl?: string;
}

function ProfileImageUploader(props: IProps) {
  const { setProfileImageFile, userImgUrl } = props;

  const [fileImage, setFileImage] = useState(userImgUrl);
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
  return (
    <>
      <h1>이미지 업로드 </h1>
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input name="imggeUpload" type="file" accept="image/*" onChange={saveFileImage} />
      </div>

      <div>
        {fileImage && (
          <ProfileImageWrapper alt="sample" src={fileImage} className="img-render" style={{ margin: 'auto' }} />
        )}
        {/* <button
          style={{
            width: "50px",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => deleteFileImage()}
        >
          삭제
        </button> */}
      </div>
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
