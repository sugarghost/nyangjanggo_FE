import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { COLOR_V2 } from "../constants/ColorV2";
import {
  validateUserIdV2,
  validatePasswordV2,
  validateBlank,
} from "../helpers/ValidateHelper";
import CheckIcon from "../images/check_icon.png";
import ResetBtnIcon from "../images/input_reset_btn.png";

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
  validationMessage: string;
  inputLabel?: string;
  value: string;
  onChange: (e: React.KeyboardEvent, validationErorr?: boolean) => void;
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
    validationMessage,
    inputLabel,
    value,
    onChange,
    onKeyDown,
    onClickClearValue,
    loginType,
    validationCheck,
    warningMessage,
    inputType,
    setEmailDomain,
    setNationalCode,
    isEmailConfirm,
    password,
    isTimer,
    sucssessMessage,
    emailSendSuccess,
    seletedDomain,
    setEmailSendSuccess,
    autoComplete = "off",
  }: IProps = props;

  const [validationErorr, setValidationErorr] = useState(false);
  const [timeOver, setTimeOver] = useState(false);

  const [emailInputType, setEmailInputType] = useState(false);

  const setValidation = useCallback(
    (inputValue: string, inputType?: InputType) => {
      if (inputType === "userId" && !loginType) {
        if (validateUserIdV2(inputValue)) {
          setValidationErorr(false);
        } else {
          setValidationErorr(true);
        }
      } else if (inputType === "password" && !loginType) {
        if (validatePasswordV2(inputValue)) {
          setValidationErorr(false);
        } else {
          setValidationErorr(true);
        }
      } else if (inputType === "confirmPassword") {
        if (password === inputValue) {
          setValidationErorr(false);
        } else {
          setValidationErorr(true);
        }
      } else if (inputType === "email") {
        if (validateBlank(inputValue)) {
          setValidationErorr(false);
        } else {
          setValidationErorr(true);
        }
      } else if (inputType === "phone") {
        if (validateBlank(inputValue)) {
          setValidationErorr(false);
        } else {
          setValidationErorr(true);
        }
      }
    },
    [value]
  );

  const onChangeInput = (e: React.KeyboardEvent) => {
    const eventTarget = e.target as HTMLTextAreaElement;
    setValidation(eventTarget.value, inputType);
    onChange(e, validationErorr);
  };

  const setInputType = (): string => {
    if (inputType === "phone") {
      return "number";
    } else if (inputType === "password" || inputType === "confirmPassword") {
      return "password";
    } else {
      return "text";
    }
  };

  const emailDomains = [
    { key: "naver", value: "@naver.com" },
    { key: "gmail", value: "@gmail.com" },
    { key: "kakao", value: "@kakao.com" },
    { key: "hanmail", value: "@hanmail.net" },
    { key: "daum", value: "@daum.net" },
    { key: "nate", value: "@nate.com" },
  ];

  // 국기 아이콘 추가예정..
  const nationalCodes = [
    { key: "KOR", value: "+82", name: "한국(+82)" },
    { key: "CHN", value: "+86", name: "중국(+86)" },
    { key: "HKG", value: "+852", name: "홍콩(+852)" },
    { key: "THA", value: "+66", name: "태국(+66)" },
    { key: "RUS", value: "+7", name: "러시아(+7)" },
    { key: "JPN", value: "+81", name: "일본(+81)" },
    { key: "TW", value: "+886", name: "타이완(+886)" },
    { key: "USA", value: "+1", name: "미국(+1)" },
  ];

  return (
    <InputContainer styleCustom={styleCustom}>
      <LabelContainer>
        <InputLable styleCustom={styleCustom} color={COLOR_V2.BLACK1}>
          {inputLabel}
        </InputLable>
        {warningMessage && (
          <WarningMessageWrapper color={COLOR_V2.PRIMARY4}>
            {warningMessage}
          </WarningMessageWrapper>
        )}
      </LabelContainer>
      <FlexContainer styleCustom={styleCustom}>
        <InputOuter styleCustom={styleCustom}>
          <InputWrapper
            type={setInputType()}
            maxLength={
              loginType ? "" : inputType === "phone" ? 20 : "password" ? 16 : ""
            }
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
          {value && inputType !== "emailAuth" && !disabled && (
            <ClearBtn onClick={onClickClearValue} src={ResetBtnIcon}>
              <img src={ResetBtnIcon} />
            </ClearBtn>
          )}
        </InputOuter>
      </FlexContainer>
      {emailSendSuccess ? (
        <ValidationSuccess color={COLOR_V2.GREEN}>
          <CheckIconWrapper className="img-render" src={CheckIcon} />{" "}
          {sucssessMessage}
        </ValidationSuccess>
      ) : validationErorr || validationCheck ? (
        <ValidationError color={COLOR_V2.PRIMARY3}>
          {validationMessage}{" "}
        </ValidationError>
      ) : (
        <ValidationError>&nbsp;</ValidationError>
      )}
    </InputContainer>
  );
};

InputV2.defaultProps = {
  styleCustom: {
    margin: "16px 0 0 0",
    width: "100%",
    height: "52px",
    hoverColor: COLOR_V2.GRAY7,
    focusColor: COLOR_V2.GRAY7,
    defaultBorder: COLOR_V2.GRAY1,
    errorColor: COLOR_V2.PRIMARY4,
    borderColor: COLOR_V2.GRAY1,
  },
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
  border-radius: 8px;
  flex: none;
  order: 1;

  flex-grow: 0;
  margin: 0px 0px;

  background: ${(props) =>
    props.disabled ? props.styleCustom?.disabledColor : ""};

  border: ${(props) =>
    props.disabled
      ? "none"
      : props.validationCheck || props.validationErorr
      ? "1px solid" + props.styleCustom?.errorColor
      : "1px solid" + props.styleCustom?.borderColor};

  width: ${(props) =>
    props.inputType === "email"
      ? "55%"
      : props.styleCustom?.width
      ? props.styleCustom?.width
      : ""};
  height: ${(props) =>
    props.styleCustom?.height ? props.styleCustom?.height : ""};
  width: 100%;
  height: 100%;

  user-select: text;

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

const ValidationError = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""};
  text-align: left;
  margin: 10px 0px 0px 8px;
`;

const ValidationSuccess = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""};
  text-align: left;
  margin: 10px 0px 0px 4px;
`;

const WarningMessageWrapper = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px;
  text-align: left;
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

const SelectBoxWrapper = styled.select<any>`
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
  border: 1px solid
    ${(props) =>
      props.styleCustom?.borderColor ? props.styleCustom?.borderColor : ""};
  box-sizing: border-box;
  border-radius: 8px;
  flex-grow: 0;
  border: ${(props) =>
    props.validationCheck
      ? `1px solid ${props.styleCustom?.errorColor}`
      : `1px solid ${props.styleCustom?.borderColor}`};
  width: ${(props) =>
    props.inputType === "email"
      ? "50%"
      : props.styleCustom.width
      ? props.styleCustom.width
      : ""};
  height: ${(props) =>
    props.styleCustom?.height ? props.styleCustom?.height : ""};
  margin-left: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.02em;

  @media screen and (max-width: 768px) {
    width: 65%;
    padding: 12px 2px;
  }

  &:hover {
    outline: none;
    border: 1px solid
      ${(props) => (props.disabled ? "" : props.styleCustom?.hoverColor ?? "")};
  }

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.styleCustom?.focusColor ?? ""};
  }
`;

const DirectInputWrapper = styled.input<any>`
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
  border: 1px solid ${(props) => props.styleCustom?.borderColor};
  box-sizing: border-box;
  border-radius: 8px;
  flex-grow: 0;
  border: ${(props) =>
    props.validationCheck
      ? "1px solid" + props.styleCustom?.errorColor
      : "1px solid" + props.styleCustom?.borderColor};
  width: ${(props) =>
    props.inputType === "email"
      ? "50%"
      : props.styleCustom?.width
      ? props.styleCustom?.width
      : ""};
  height: ${(props) =>
    props.styleCustom?.height ? props.styleCustom?.height : ""};
  margin-left: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.02em;

  @media screen and (max-width: 768px) {
    width: 65%;
    padding: 12px 2px;
  }

  &:hover {
    outline: 1px solid ${(props) => props.styleCustom?.hoverColor ?? ""};
  }

  &:focus {
    border: none;
    outline: 1px solid ${(props) => props.styleCustom?.focusColor ?? ""};
  }
`;

const NationalCodeSelectWrapper = styled.select<any>`
  left: 15px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.01em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  color: ${(props) => props.color ?? ""};

  &:focus {
    width: 70px;
    padding: 5px;
    font-size: 15px;
  }
`;

const TimerWrapper = styled.span`
  width: 16.5px;
  height: 16.5px;
  position: absolute;
  right: 25px;
  top: 45%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  text-align: right;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""};
`;

const CheckIconWrapper = styled.img`
  margin-right: 5px;
  width: 10px;
  height: 7px;
  margin: auto 3px auto 0px;
`;

export default InputV2;
