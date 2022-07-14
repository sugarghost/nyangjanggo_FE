import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import styled from "styled-components";

import { ResourceFormData } from "../../type/recipeType";

type CategoryProps = {
  name: string;
  index: number;
  onDelete: any;
};

const Category = ({ name, index, onDelete }: CategoryProps) => {
  const { register, control } = useFormContext<ResourceFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `categories.${index}.resources`,
  });
  const deleteCategory = () => {
    remove();
    onDelete();
  };
  return (
    <div className="shadow-md p-4 flex flex-col w-full h-auto rounded-lg">
      <div className="mb-4">
        <input
          defaultValue={name}
          placeholder="재료 분류"
          className="text-lg my-1 font-500 float-left"
          {...register(`categories.${index}.name`, { required: true })}
        />
        <span className="float-right" onClick={deleteCategory}>
          <FontAwesomeIcon icon={faMinus} color="grey" size="lg" />
        </span>
      </div>
      {fields.map((item, i) => (
        <div key={item.id}>
          <div className="flex justify-between w-full">
            <input
              className="float-left text-base w-1/3 my-1 font-400"
              defaultValue={item.resourceName}
              placeholder="재료명"
              {...register(`categories.${index}.resources.${i}.resourceName`, {
                required: true,
              })}
            />
            <input
              className="float-left text-base w-1/3 my-1 font-400"
              defaultValue={item.amount}
              placeholder="재료량"
              {...register(`categories.${index}.resources.${i}.amount`, {
                required: true,
              })}
            />
            <span className="float-right" onClick={() => remove(i)}>
              <FontAwesomeIcon icon={faMinus} color="grey" size="sm" />
            </span>
          </div>
          <hr />
        </div>
      ))}
      <p className="mt-2" onClick={() => append({})}>
        <FontAwesomeIcon icon={faPlus} color="grey" size="lg" />
      </p>
    </div>
  );
};

export default Category;

const IngredientsWrapper = styled.div`
  margin: 8px 0 0 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-width: 350px;
  border-radius: 8px;
  padding: 16px 16px 100px 16px;
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
