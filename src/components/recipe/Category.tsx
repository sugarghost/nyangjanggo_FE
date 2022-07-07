import * as React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import styled from "styled-components";

import { ResourceFormData } from "../../type/recipeType";

type CategoryProps = {
  name: string;
  index: number;
  onDelete: any;
};

const Country = ({ name, index, onDelete }: CategoryProps) => {
  const { register, control } = useFormContext<ResourceFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `categories.${index}.resource`,
  });

  return (
    <IngredientsWrapper className="box-shadow">
      <IngredientTitle>
        <input
          defaultValue={name}
          {...register(`categories.${index}.name`, { required: true })}
        />
        <button onClick={onDelete}>삭제</button>
      </IngredientTitle>
      {fields.map((item, i) => (
        <div key={item.id}>
          <IngredientInfoWrapper>
            <div className="float-left">
              <input
                defaultValue={item.resourceName}
                placeholder="재료명"
                {...register(`categories.${index}.resource.${i}.resourceName`, {
                  required: true,
                })}
              />
              <input
                defaultValue={item.amount}
                placeholder="재료량"
                {...register(`categories.${index}.resource.${i}.amount`, {
                  required: true,
                })}
              />
              <button onClick={() => remove(i)}>삭제</button>
            </div>
          </IngredientInfoWrapper>
        </div>
      ))}
      <button onClick={() => append({})}>재료 추가</button>
    </IngredientsWrapper>
  );
};

export default Country;

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
