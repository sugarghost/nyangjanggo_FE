import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import styled from "styled-components";

import { StepFormData } from "../../type/recipeType";

type StepProps = {
  index: number;
  onDelete: any;
};

const Step = ({ index, onDelete }: StepProps) => {
  const { register, getValues, setValue } = useFormContext<StepFormData>();

  const [imageUrl, setImageUrl] = useState<string>(
    getValues(`boardRequestDtoStepRecipe.${index}.imageLink`)
  );

  const fileRef = useRef<any>();

  //src에 직접 값을 지정하고 state로 setImageUrl을 사용해봐도 렌더링이 되지 않아서 Effect를 등록함
  useEffect(() => {}, [imageUrl]);

  // 조리 이미지 클릭 시 Click 이벤트를 연결된 input 요소로 옮겨줌
  const stepImageClick = () => {
    fileRef.current.click();
  };
  // 조리 이미지 클릭 시 stepImageClick을 통해 file 타입을 가진 input 요소가 호출 되며,
  // input 요소의 파일이 변경되면 실행 됨
  const onSaveStepImageFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files?.length) {
      // 요소에 지정 된 파일을 가져옴
      const uploadFile = e.target.files[0];
      // 파일에서 URL을 추출
      const imgUrl = URL.createObjectURL(uploadFile);
      setImageUrl(imgUrl);
      setValue(`boardRequestDtoStepRecipe.${index}.imageLink`, imgUrl);
      setValue(`boardRequestDtoStepRecipe.${index}.multipartFile`, uploadFile);
    }
  };

  return (
    <>
      <div className="mb-4">
        <span className="text-lg my-1 font-500 float-left">
          조리과정 {index + 1}
        </span>
        <span className="float-right" onClick={onDelete}>
          <FontAwesomeIcon icon={faMinus} color="grey" size="lg" />
        </span>
      </div>
      <div className="flex justify-between w-full mb-4">
        <input
          {...register(`boardRequestDtoStepRecipe.${index}.stepNum`, {
            required: true,
          })}
          value={index}
          hidden
        />
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg"
          ref={fileRef}
          onChange={(e) => onSaveStepImageFile(e, index)}
          hidden
        />
        <img
          height="w-2/6"
          className="img-render w-2/6 rounded-lg"
          onClick={stepImageClick}
          // boardRequestDtoStepRecipe.${index}.imgUrl 형식으로 값을 등록해 봤지만 이미지가 변경이 되도 렌더링이 안되는 문제가 발생
          // useState를 사용해봐도 렌더링이 안되서 추가로 useEffect를 사용함
          src={imageUrl}
        />
        <textarea
          className="w-4/6 ml-4 border-gray-200 border-2 rounded-md p-1"
          placeholder="조리 과정을 알려주세요!"
          {...register(`boardRequestDtoStepRecipe.${index}.stepContent`, {
            required: true,
          })}
        ></textarea>
      </div>
    </>
  );
};

export default Step;

const RecipeStepImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;
const RecipeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const IngredientTitle = styled.div`
  text-align: left;
  font-weight: bold;
  margin-bottom: 13px;
`;

const IngredientInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 7px 0;
  border-bottom: 1px solid grey;
`;
