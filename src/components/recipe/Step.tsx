import recipeApi from '@apis/RecipeApi';
import { ReactComponent as XIcon } from '@icon/x.svg';
import PreviewImage from '@images/preview_image.png';
import { RecipeForm } from '@type/recipeType';
import imageCompression from 'browser-image-compression';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import styled from 'styled-components';

type StepProps = {
  boardId: number;
  index: number;
  onDelete: any;
};

// boardId를 가져오기 위해 그냥 자식 컴포넌트 호출 시 넣어줬는데, 좀더 효율적인 방법이 있지 않을까?
// 바뀌지 않고 모든 자식 컴포넌트에 동일한 정적 데이터니, 부모에 state를 호출하는 방법을 리팩토링때 고려하는게 좋아보임
const Step = ({ boardId, index, onDelete }: StepProps) => {
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<RecipeForm>();

  const [imageUrl, setImageUrl] = useState('');

  const fileRef = useRef<any>();

  // 이미지 압축을 위해 사용
  const compressImage = async (image: File) => {
    try {
      // 최대한 1MB가 안넘도록 처리
      const options = {
        maxSizeMb: 1,
        // 용량 제한을 걸어도 원본의 크기 자체가 너무 크면 잘 작동이 안되서 최대 길이를 제한함
        maxWidthOrHeight: 900,
      };
      return await imageCompression(image, options);
    } catch (e) {
      console.log(e);
    }
  };
  const postImageApi = recipeApi.postImage;

  // src에 직접 값을 지정하고 state로 setImageUrl을 사용해봐도 렌더링이 되지 않아서 Effect를 등록함
  useEffect(() => {}, [imageUrl]);
  useEffect(() => {
    if (watch(`recipeStepRequestDtoList.${index}.imageLink`)) {
      setImageUrl(watch(`recipeStepRequestDtoList.${index}.imageLink`));
    }
  }, [watch(`recipeStepRequestDtoList.${index}.imageLink`)]);
  // 조리 이미지 클릭 시 Click 이벤트를 연결된 input 요소로 옮겨줌
  const stepImageClick = () => {
    fileRef.current.click();
  };

  // 이미지 변경시 DB에 저장하고 Url을 받아오기 위한 API
  const postStepImageMutation = useMutation((addData: FormData) => postImageApi(addData), {
    onSuccess: (res) => {
      setImageUrl(res.data.imageLink);
      setValue(`recipeStepRequestDtoList.${index}.imageLink`, res.data.imageLink);
    },
    onError: () => {
      // 예외처리 필요!
    },
  });

  // 조리 이미지 클릭 시 stepImageClick을 통해 file 타입을 가진 input 요소가 호출 되며,
  // input 요소의 파일이 변경되면 실행 됨
  const onSaveStepImageFile = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files?.length) {
      // 요소에 지정 된 파일을 가져옴
      const uploadFile = e.target.files[0];
      const compressedImage = await compressImage(uploadFile);
      if (compressedImage) {
        const file = new File([compressedImage], compressedImage.name, { type: compressedImage.type });
        const formData = new FormData();
        formData.append('boardId', String(boardId));
        formData.append('multipartFile', file);

        postStepImageMutation.mutate(formData);
      } else {
        // 예외처리 필요!
      }
    }
  };

  return (
    <>
      <div className="mb-4">
        <span className="text-lg my-1 font-500 float-left">조리과정 {index + 1}</span>
        <span className="float-right" onClick={onDelete}>
          <XIcon stroke="grey" />
        </span>
      </div>
      <div className="flex justify-between w-full mb-4">
        <input {...register(`recipeStepRequestDtoList.${index}.stepNum`, { required: true })} value={index} hidden />
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg"
          ref={fileRef}
          onChange={(e) => onSaveStepImageFile(e, index)}
          hidden
        />
        <img
          style={{ width: '66px', height: '66px', borderRadius: '10px', overflow: 'hidden' }}
          className="img-render rounded-lg"
          onClick={stepImageClick}
          // recipeStepRequestDtoList.${index}.imgUrl 형식으로 값을 등록해 봤지만 이미지가 변경이 되도 렌더링이 안되는 문제가 발생
          // useState를 사용해봐도 렌더링이 안되서 추가로 useEffect를 사용함
          src={imageUrl || PreviewImage}
          alt=""
        />

        <div className="flex flex-col w-3/5 ml-1">
          <StepTextarea
            validationCheck={errors.recipeStepRequestDtoList?.[index]?.stepContent}
            placeholder="조리 과정을 알려주세요!"
            {...register(`recipeStepRequestDtoList.${index}.stepContent`, { required: true, max: 1000 })}
          />

          {errors.recipeStepRequestDtoList?.[index]?.stepContent && (
            <ValidationMessage>{errors.recipeStepRequestDtoList?.[index]?.stepContent.message}</ValidationMessage>
          )}
        </div>
      </div>
    </>
  );
};

export default Step;

const StepTextarea = styled.textarea<any>`
  padding: 0.25rem;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: ${(props) => (props.validationCheck ? '#EB3120' : '#D1D5DB')};
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
