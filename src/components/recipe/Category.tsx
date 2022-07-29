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
        <div className="flex flex-col w-70vw float-left">
          <ResourceCategoryInput
            validationCheck={errors.resourceRequestDtoList?.[index]?.category}
            defaultValue={name}
            placeholder="재료 분류"
            {...register(`resourceRequestDtoList.${index}.category`, { required: true, max: 30 })}
          />
          {errors.resourceRequestDtoList?.[index]?.category && (
            <ValidationMessage>{errors.resourceRequestDtoList?.[index]?.category.message}</ValidationMessage>
          )}
        </div>
        <span className="float-right" onClick={deleteCategory}>
          <XIcon stroke="grey" />
        </span>
      </div>
      {fields.map((item, i) => (
        <div key={item.id}>
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-40vw">
              <ResourceInput
                validationCheck={errors.resourceRequestDtoList?.[index]?.resources?.[i]?.resourceName}
                defaultValue={item.resourceName}
                placeholder="재료명"
                {...register(`resourceRequestDtoList.${index}.resources.${i}.resourceName`, {
                  required: true,
                  max: 30,
                })}
              />
              {errors.resourceRequestDtoList?.[index]?.resources?.[i]?.resourceName && (
                <ValidationMessage>
                  {errors.resourceRequestDtoList?.[index]?.resources?.[i]?.resourceName.message}
                </ValidationMessage>
              )}
            </div>
            <div className="flex flex-col w-40vw">
              <ResourceInput
                validationCheck={errors.resourceRequestDtoList?.[index]?.resources?.[i]?.amount}
                defaultValue={item.amount}
                placeholder="재료량"
                {...register(`resourceRequestDtoList.${index}.resources.${i}.amount`, { required: true, max: 30 })}
              />

              {errors.resourceRequestDtoList?.[index]?.resources?.[i]?.amount && (
                <ValidationMessage>
                  {errors.resourceRequestDtoList?.[index]?.resources?.[i]?.amount.message}
                </ValidationMessage>
              )}
            </div>
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
  border-bottom-width: ${(props) => (props.validationCheck ? '1px' : '0')};
  border-color: ${(props) => (props.validationCheck ? '#EB3120' : '#D1D5DB')}; ;
`;

const ResourceInput = styled.input<any>`
  float: left;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-bottom-width: ${(props) => (props.validationCheck ? '1px' : '0')};
  border-color: ${(props) => (props.validationCheck ? '#EB3120' : '#D1D5DB')}; ;
`;

const ValidationMessage = styled.p`
  text-align: left;
  font-size: 9px;
  color: #eb3120;
  font-weight: normal;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
`;
