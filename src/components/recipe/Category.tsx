import { ReactComponent as PlusIcon } from '@icon/plus.svg';
import { ReactComponent as XIcon } from '@icon/x.svg';
import { RecipeForm } from '@type/recipeType';
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import styled from 'styled-components';

type CategoryProps = {
  name: string;
  index: number;
  onDelete: any;
};

const Category = ({ name, index, onDelete }: CategoryProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RecipeForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `resourceRequestDtoList.${index}.resources`,
  });
  const deleteCategory = () => {
    remove();
    onDelete();
  };
  return (
    <div className="shadow-md p-4 flex flex-col w-full h-auto rounded-lg">
      <div className="mb-4">
        <ResourceCategoryInput
          validationCheck={errors.resourceRequestDtoList?.[index]?.category}
          defaultValue={name}
          placeholder="재료 분류"
          {...register(`resourceRequestDtoList.${index}.category`, { required: true })}
        />
        <span className="float-right" onClick={deleteCategory}>
          <XIcon stroke="grey" />
        </span>
      </div>
      {fields.map((item, i) => (
        <div key={item.id}>
          <div className="flex justify-between w-full">
            <ResourceInput
              validationCheck={errors.resourceRequestDtoList?.[index]?.resources?.[i]?.resourceName}
              className="float-left text-base w-2/5 my-1 font-400"
              defaultValue={item.resourceName}
              placeholder="재료명"
              {...register(`resourceRequestDtoList.${index}.resources.${i}.resourceName`, { required: true })}
            />
            <ResourceInput
              validationCheck={errors.resourceRequestDtoList?.[index]?.resources?.[i]?.amount}
              className="float-left text-base w-2/5 my-1 font-400"
              defaultValue={item.amount}
              placeholder="재료량"
              {...register(`resourceRequestDtoList.${index}.resources.${i}.amount`, { required: true })}
            />
            <span className="float-right" onClick={() => remove(i)}>
              <XIcon stroke="grey" />
            </span>
          </div>
          <hr />
        </div>
      ))}
      <p className="mt-2" onClick={() => append({})}>
        <PlusIcon stroke="grey" />
      </p>
    </div>
  );
};

export default Category;
const ResourceCategoryInput = styled.input<any>`
  float: left;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  width: 70%;
  border-bottom-width: ${(props) => (props.validationCheck ? '1px' : '0')};
  border-color: ${(props) => (props.validationCheck ? '#EB3120' : '#D1D5DB')}; ;
`;

const ResourceInput = styled.input<any>`
  float: left;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 40%;
  border-bottom-width: ${(props) => (props.validationCheck ? '1px' : '0')};
  border-color: ${(props) => (props.validationCheck ? '#EB3120' : '#D1D5DB')}; ;
`;
