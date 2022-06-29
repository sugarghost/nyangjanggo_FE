import React from "react";
import styled from "styled-components";

import { COLOR_V2 } from "../constants/ColorV2";

interface StyleCustom {
  width?: string;
  height?: string;
  margin?: string;
  background?: string;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  padding?: string;
  fontSize?: string;
  maxWidth?: string;
  borderRadius?: string;
  boxShadow?: string;
  lineHeigth?: string;
}

interface IProps {
  className?: string;
  backgroundColor?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  styleCustom?: StyleCustom;
  isIcon?: boolean;
  icon?: string;
  isFull?: boolean;
  children?: React.ReactElement;
}

function Button(props: IProps) {
  const {
    onClick,
    disabled = false,
    styleCustom,
    className,
    isIcon,
    children,
    isFull = true,
  }: IProps = props;

  return (
    <>
      <ButtonWrapper
        className={className}
        type="button"
        styleCustom={styleCustom}
        onClick={onClick}
        disabled={disabled}
        color={COLOR_V2.WHITE1}
        hoverColor={COLOR_V2.PRIMARY5}
        activeColor={COLOR_V2.PRIMARY_ACTIVE}
        disabledColor={COLOR_V2.PRIMARY_DISABLED}
        isIcon={isIcon}
        isFull={isFull}
      >
        {children}
      </ButtonWrapper>
    </>
  );
}

export default Button;

const ButtonWrapper = styled.button<any>`
  background-color: ${(props) => props.styleCustom.background};
  color: ${(props) => props.styleCustom.color ?? "white"};
  border-radius: ${(props) => props.styleCustom.borderRadius ?? "8px"};
  padding: ${(props) => props.styleCustom.padding ?? "0 16px"};
  order: 2;
  display: ${(props) => (props.isIcon ? "flex" : "block")};
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.styleCustom.fontSize ?? "18px"};
  line-height: ${(props) => props.styleCustom?.lineHeight ?? "22px"};
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  box-shadow: ${(props) => props.styleCustom?.boxShadow ?? ""};
  width: ${(props) =>
    props.styleCustom?.width ? props.styleCustom?.width : ""};
  height: ${(props) =>
    props.styleCustom.height ? props.styleCustom?.height : "50px"};
  margin: ${(props) =>
    props.styleCustom.margin ? props.styleCustom?.margin : ""};
  max-width: ${(props) => props.styleCustom?.maxWidth ?? ""};

  @media screen and (max-width: 680px) {
    width: ${(props) => (!props.isFull ? props.styleCustom?.width : "100%")};
  }

  &:hover {
    background-color: ${(props) => props.styleCustom?.hoverColor};
  }
  &:active {
    background-color: ${(props) => props.styleCustom?.activeColor};
  }
  &:disabled {
    background-color: ${(props) => props.styleCustom?.disabledColor};
  }
`;

const IconWrapper = styled.img`
  width: 16px;
  height: 16px;
  object-fit: fit;
  margin-right: 4px;
`;
