import React from 'react';
import styled from 'styled-components';

import { COLOR_V2 } from '../constants/ColorV2';
import LikeIcon from '../images/like_icon.png';

export type CardType = 'coupon' | 'normal';

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
  subTitle?: string;
  cardImg?: string;
  cardExpiration?: string;
  className?: string;
  backgroundColor?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  styleCustom?: StyleCustom;
  cardPromotionValue?: string;
  rank?: number;
  key?: any;
}

function Card(props: IProps) {
  const { onClick, rank, styleCustom, key, cardTitle, cardImg, className }: IProps = props;

  return (
    <CardContainer onClick={onClick}>
      <div style={{ position: 'relative' }}>
        <CardImgWrapper
          key={key}
          className={className}
          styleCustom={styleCustom}
          onClick={onClick}
          color={COLOR_V2.WHITE1}
          hoverColor={COLOR_V2.PRIMARY5}
          activeColor={COLOR_V2.PRIMARY_ACTIVE}
          disabledColor={COLOR_V2.PRIMARY_DISABLED}
          src={cardImg}
        />
      </div>
      <CardContentWrapper>
        <CardContentLeft>
          <CardTitleWrapper styleCustom={styleCustom}>{cardTitle}</CardTitleWrapper>
        </CardContentLeft>
        <CardContentRight>
          <img style={{ width: '21px', height: '18px' }} src={LikeIcon} className="img-render" alt="" />
        </CardContentRight>
      </CardContentWrapper>
    </CardContainer>
  );
}

export default Card;

const CardContainer = styled.div<any>`
  background-color: ${(props) => props.styleCustom?.background ?? ''};
  color: ${(props) => props.styleCustom?.color ?? ''};
  border-radius: 8px;
  border: ${(props) => props.styleCustom?.border ?? ''};
  padding: ${(props) => props.styleCustom?.padding ?? ''};
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.styleCustom?.fontSize ?? '18px'};
  line-height: 22px;
  text-align: left;
  letter-spacing: -0.02em;
  width: ${(props) => props.styleCustom?.width ?? ''};
  height: ${(props) => props.styleCustom?.height ?? ''};
  margin: ${(props) => props.styleCustom?.margin ?? ''};
  display: flex;
  flex-direction: column;
  max-width: 185px;
`;

const CardImgWrapper = styled.img<any>`
  border-radius: 8px;
  //width: ${(props) => props.styleCustom?.width ?? ''};
  height: ${(props) => props.styleCustom?.height ?? ''};
  margin: ${(props) => props.styleCustom?.margin ?? ''};
  object-fit: cover;
  cursor: pointer;

  @media screen and (max-width: 680px) {
    width: 173px;
    height: 173px;
  }
`;

const RankWrapper = styled.div`
  position: absolute;
  top: 25px;
  left: 10px;
  width: 30px;
  height: 30px;
  background: #ffffff;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center;
  padding: 4px 0 0 0;
  font-size: 15px;
  color: #eb3120;
  font-weight: bold;
`;

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 0 0;
`;

const CardContentLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardContentRight = styled.div``;
const CardTitleWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  text-align: center;
  width: auto;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  color: #3f3f3f;
`;

const CardDescWrapper = styled.div<any>`
  margin-top: 5px;
  font-weight: 400;
  display: flex;
  letter-spacing: -0.02em;
  width: auto;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #9a9a9a;
`;
