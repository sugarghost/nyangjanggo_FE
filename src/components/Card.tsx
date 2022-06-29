import React from "react";
import styled from "styled-components";

import { COLOR_V2 } from "../constants/ColorV2";

export type CardType = "coupon" | "normal";

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
  border?: string;
  fontSize?: string;
  titleColor?: string;
  descColor?: string;
  expirationColor?: string;
}

interface IProps {
  cardType?: CardType;
  cardTitle?: string;
  cardDesc?: string;
  cardExpiration?: string;
  className?: string;
  backgroundColor?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  styleCustom?: StyleCustom;
  cardPromotionValue?: string;
}

function Card(props: IProps) {
  const { onClick, styleCustom, cardTitle, cardDesc, className }: IProps =
    props;

  return (
    <>
      <CardWrapper
        className={className}
        styleCustom={styleCustom}
        onClick={onClick}
        color={COLOR_V2.WHITE1}
        hoverColor={COLOR_V2.PRIMARY5}
        activeColor={COLOR_V2.PRIMARY_ACTIVE}
        disabledColor={COLOR_V2.PRIMARY_DISABLED}
      >
        <CardContentWrapper>
          <CardTitleWrapper styleCustom={styleCustom}>
            {cardTitle}
          </CardTitleWrapper>
          <CardDescWrapper styleCustom={styleCustom}>
            {cardDesc}
          </CardDescWrapper>
        </CardContentWrapper>
      </CardWrapper>
    </>
  );
}

export default Card;

const CardWrapper = styled.div<any>`
  background-color: ${(props) => props.styleCustom?.background ?? ""};
  color: ${(props) => props.styleCustom?.color ?? ""};
  border-radius: 8px;
  border: ${(props) => props.styleCustom?.border ?? ""};
  padding: ${(props) => props.styleCustom?.padding ?? ""};
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.styleCustom?.fontSize ?? "18px"};
  line-height: 22px;
  text-align: left;
  letter-spacing: -0.02em;
  width: ${(props) => props.styleCustom?.width ?? ""};
  height: ${(props) => props.styleCustom?.height ?? ""};
  margin: ${(props) => props.styleCustom?.margin ?? ""};

  @media screen and (max-width: 680px) {
    width: 100%;
  }

  &:hover {
    background-color: ${(props) => props.styleCustom?.hoverColor ?? ""};
  }
  &:active {
    background-color: ${(props) => props.styleCustom?.activeColor ?? ""};
  }
  &:disabled {
    background-color: ${(props) => props.styleCustom?.disabledColor ?? ""};
  }
`;

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardTitleWrapper = styled.div<any>`
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
`;

const CardDescWrapper = styled.div<any>`
  margin-top: 16px;
  font-weight: 400;
  font-size: 12px;
  line-height: 90%;
  display: flex;
  letter-spacing: -0.02em;
`;
