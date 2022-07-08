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
    <IngredientsWrapper className="box-shadow">
      <IngredientTitle>
        <input
          defaultValue={name}
          placeholder="재료 분류"
          {...register(`categories.${index}.name`, { required: true })}
        />
        <input type="button" onClick={deleteCategory} value="삭제" />
      </IngredientTitle>
      {fields.map((item, i) => (
        <div key={item.id}>
          <IngredientInfoWrapper>
            <div className="float-left">
              <input
                defaultValue={item.resourceName}
                placeholder="재료명"
                {...register(
                  `categories.${index}.resources.${i}.resourceName`,
                  {
                    required: true,
                  }
                )}
              />
              <input
                defaultValue={item.amount}
                placeholder="재료량"
                {...register(`categories.${index}.resources.${i}.amount`, {
                  required: true,
                })}
              />
              <input type="button" onClick={() => remove(i)} value="삭제" />
            </div>
          </IngredientInfoWrapper>
        </div>
      ))}
      <input type="button" onClick={() => append({})} value="재료 추가" />
    </IngredientsWrapper>
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
