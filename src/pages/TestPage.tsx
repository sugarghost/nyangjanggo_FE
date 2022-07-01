import React, { Suspense, useEffect, useState } from "react";
import { FieldValues, useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import boardPostApi from "../apis/useBoradtApi";
import Button from "../components/Botton";
import Figure from "../components/Figure";
import InputV2 from "../components/Input";
import userToken from "../recoil/userAtom";

const TestPage = ({}) => {
  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index: number) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service">Service(s)</label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <input
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && serviceList.length < 4 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Add a Service</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="output">
        <h2>Output</h2>
        {serviceList &&
          serviceList.map((singleService, index) => (
            <ul key={index}>
              {singleService.service && <li>{singleService.service}</li>}
            </ul>
          ))}
      </div>
    </form>
  );
};

export type StepPostFormFileds = {
  stepContent: string;
  image: File;
};

export type ResourcePostFormFileds = {
  resourceName: string;
  amount: string;
  category: string;
};

export type BoardPostFormFileds = {
  title: string;
  subTitle: string;
  content: string;
  frontImageLink: File;
  step: StepPostFormFileds[];
  resource: ResourcePostFormFileds[];
};

export const BoardPost = ({}) => {
  useEffect(() => {}, []);
  const data = JSON.stringify({
    description: "description",
  });
  const queryClient = useQueryClient();
  const { control, register, handleSubmit, formState, setValue } =
    useForm<BoardPostFormFileds>({ mode: "onChange" });

  const { fields: resourceFields, append: resourceAppend } = useFieldArray({
    control,
    name: "resource",
  });

  const { fields: stepFields, append: stepAppend } = useFieldArray({
    control,
    name: "step",
  });
  const { fields: categoryFields, append: categoryAppend } = useFieldArray({
    control,
    name: "category",
  });

  const [file, setFile] = useState<File>();
  const [files, setFiles] = useState<File[]>([]);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const postApi = boardPostApi.post;

  const mutation = useMutation(
    (addData: BoardPostFormFileds) => postApi(addData),
    {
      onSuccess: (res) => {
        console.log("res:", res);
        //queryClient.invalidateQueries("postList");
      },
      onError: () => {},
    }
  );

  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files);
    uploadFiles.forEach((uploadFile) => {
      const imgUrl = URL.createObjectURL(uploadFile);
      setImgUrls((urls) => [...urls, imgUrl]);
      setFiles((imgs) => [...imgs, uploadFile]);
    });
  };

  const onSaveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadFile = e.target.files[0];
      const imgUrl = URL.createObjectURL(uploadFile);
      setImgUrl(imgUrl);
      setFile(uploadFile);
    }
  };

  const onSaveCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadFile = e.target.files[0];
      const imgUrl = URL.createObjectURL(uploadFile);
      setImgUrl(imgUrl);
      setFile(uploadFile);
    }
  };

  const saveBtnClick = (data: BoardPostFormFileds) => {
    console.log("data: ", data);
    /*
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file);
    });
    const { title, content, step } = data;
    formData.append("title", title);
    formData.append("content", content);
    formData.append("step", step);
    mutation.mutate(formData);
    */
    mutation.mutate(data);
  };
  const categoryArea = <></>;
  return (
    <>
      {/* Suspense를 사용하면 컴포넌트가 렌더링되기 전까지 기다릴 수 있습니다 */}
      <Suspense fallback={<div>로딩중입니다.</div>}>
        <form
          onSubmit={handleSubmit(saveBtnClick)}
          encType="multipart/formdata"
        >
          <p>요리 메인 이미지</p>
          <Figure key={imgUrl} alt={imgUrl} src={imgUrl} width="80%" />
          <input
            type="file"
            {...register("frontImageLink", { required: true })}
            onChange={onSaveFile}
            accept="image/jpg,impge/png,image/jpeg"
          />

          <p>요리명</p>
          <input
            type="text"
            {...register("title", { required: true })}
            required
          />

          <p>요리소개</p>
          <input
            type="text"
            {...register("subTitle", { required: true })}
            required
          />
          <p>요리 설명</p>
          <textarea {...register("subTitle", { required: true })} required />

          <div>
            <p>재료 분류</p>
            <button type="button" onClick={() => categoryAppend({})}>
              재료 분류 추가
            </button>

            {categoryFields.map((field, index) => (
              <div key={field.id}>
                카테고리 입력
                <input type="text" onChange={onSaveCategory} />
                <ul>
                  {resourceFields.map((field, index) => (
                    <li key={field.id}>
                      <input
                        {...register(`resource.${index}.category`)}
                        hidden
                      />
                      재료명
                      <input
                        {...register(`resource.${index}.resourceName`)}
                        required
                      />
                      재료량
                      <input
                        {...register(`resource.${index}.amount`)}
                        required
                      />
                      <br />
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => resourceAppend({})}>
                  재료 추가
                </button>
              </div>
            ))}
          </div>

          <div>
            <div id="stepArea">
              <ul>
                {stepFields.map((field, index) => (
                  <li key={field.id}>
                    조리 과정
                    <input
                      {...register(`step.${index}.stepContent`)}
                      required
                    />
                    조리 사진
                    <input
                      type="file"
                      accept="image/jpg,impge/png,image/jpeg"
                      {...register(`step.${index}.image`)}
                      onChange={onSaveFiles}
                    />
                    <br />
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={() => stepAppend({})}>
              조리과정 추가
            </button>
          </div>
          <p>저장</p>
          <input type="submit" />
        </form>
      </Suspense>
    </>
  );
};

export default TestPage;
