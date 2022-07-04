import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { COLOR_V2 } from "../constants/ColorV2";

type InputType =
  | "text"
  | "userId"
  | "password"
  | "confirmPassword"
  | "email"
  | "emailConfirm"
  | "phone"
  | "emailAuth";

interface IProps {
  className?: string;
  size?: string;
  disabled?: boolean;
  styleCustom?: Record<string, string>;
  placeholder?: string;
  validationMessage?: string;
  inputLabel?: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    validationErorr?: boolean
  ) => void;
  onClickClearValue?: (e: MouseEvent) => void;
  validationCheck?: boolean;
  loginType?: boolean;
  onKeyDown?: (e: React.KeyboardEvent, validationErorr: boolean) => void;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  warningMessage?: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  inputType?: InputType;
  // email
  setEmailDomain?: React.Dispatch<React.SetStateAction<string>>;
  seletedDomain?: string;
  isEmailConfirm?: boolean;
  // phone
  setNationalCode?: React.Dispatch<React.SetStateAction<string>>;
  password?: string;
  maxLength?: number;
  isTimer?: boolean;
  sucssessMessage?: string;
  emailSendSuccess?: boolean;
  setEmailSendSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  autoComplete?: string;
}

const InputV2 = (props: IProps) => {
  // validation callback 으로 받고 keydown시 먼저 검사
  const {
    disabled = false,
    styleCustom,
    placeholder,
    inputLabel,
    value,
    onChange,
    onKeyDown,
    onClickClearValue,
    validationCheck,
    inputType,
    autoComplete = "off",
  }: IProps = props;

  const [validationErorr, setValidationErorr] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, validationErorr);
  };

  return (
    <InputContainer styleCustom={styleCustom}>
      <LabelContainer>
        <InputLable styleCustom={styleCustom} color={COLOR_V2.BLACK1}>
          {inputLabel}
        </InputLable>
      </LabelContainer>
      <FlexContainer styleCustom={styleCustom}>
        <InputOuter styleCustom={styleCustom}>
          <InputWrapper
            type="text"
            placeholder={placeholder}
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
            onKeyUp={onChangeInput}
            value={value}
            validationCheck={validationCheck}
            styleCustom={styleCustom}
            inputType={inputType}
            validationErorr={validationErorr}
            autocomplete={autoComplete}
            disabled={disabled}
          />
        </InputOuter>
      </FlexContainer>
    </InputContainer>
  );
};

const InputContainer = styled.div<any>`
  margin: ${(props) =>
    props.styleCustom.margin ? props.styleCustom.margin : ""};
`;

const LabelContainer = styled.div`
  display: flex;
`;

const InputLable = styled.label<any>`
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: ${(props) => props.styleCustom?.labelColor};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: 8px;
  text-align: left;
`;

const InputWrapper = styled.input<any>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(props) =>
    props.inputType === "phone" ? "16px 16px 16px 100px" : "16px"};
  border: 1px solid
    ${(props) =>
      props.styleCustom.borderColor ? props.styleCustom?.borderColor : ""};
  box-sizing: border-box;
  border-radius: 4px;
  flex: none;
  background: ${(props) =>
    props.disabled ? props.styleCustom?.disabledColor : ""};
  width: 100%;
  height: 100%;
  user-select: text;
  max-width: 500px;
  margin: 0px auto;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: "10px 10px 10px 80px";
  }

  &:hover {
    outline: none;
    border: ${(props) =>
      props.disabled ? "" : `1px solid ${props.styleCustom?.hoverColor}` ?? ""};
  }

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.styleCustom?.focusColor ?? ""};
  }

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.02em;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputOuter = styled.div<any>`
  position: relative;
  height: ${(props) => props.styleCustom?.height ?? ""};
  width: ${(props) => props.styleCustom?.width ?? ""};
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
`;

const ClearBtn = styled.button<any>`
  width: 16.5px;
  height: 16.5px;
  position: absolute;
  right: 15px;
  top: 35%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
`;

const FlexContainer = styled.div<any>`
  width: ${(props) =>
    props.styleCustom?.width ? props.styleCustom?.width : ""};
  height: ${(props) =>
    props.styleCustom?.height ? props.styleCustom?.height : ""};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export default InputV2;
