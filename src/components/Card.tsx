import { ReactComponent as HeartIcon } from '@icon/heart.svg';
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
  goodCount?: number;
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
  goodCount?: number;
}

function Card(props: IProps) {
  const { onClick, styleCustom, cardTitle, cardImg, className, goodCount }: IProps = props;

  return (
    <CardContainer onClick={onClick} styleCustom={styleCustom}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <CardImgWrapper
            className={className}
            styleCustom={styleCustom}
            color={COLOR_V2.WHITE1}
            hoverColor={COLOR_V2.PRIMARY5}
            activeColor={COLOR_V2.PRIMARY_ACTIVE}
            disabledColor={COLOR_V2.PRIMARY_DISABLED}
            src={cardImg}
          />
          <CardGoodCountWrapper className="text-center p-1 justify-center">
            <HeartIcon width="20" height="20" className="m-auto float-left" stroke="white" />
            <span className="m-auto">{goodCount}</span>
          </CardGoodCountWrapper>
        </div>
        <CardContentWrapper>
          <CardTitleWrapper styleCustom={styleCustom}>{cardTitle}</CardTitleWrapper>
        </CardContentWrapper>
      </div>
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
  font-size: ${(props) => props.styleCustom?.fontSize ?? '14px'};
  line-height: 22px;
  text-align: left;
  letter-spacing: -0.02em;
  width: ${(props) => props.styleCustom?.width ?? ''};
  height: ${(props) => props.styleCustom?.height ?? ''};
  margin: ${(props) => props.styleCustom?.margin ?? ''};
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.styleCustom?.width ?? ''};
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

  @media screen and (min-width: 681px) and (max-width: 768px) {
    width: 230px;
    height: 230px;
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
  padding: 10px 0 0 0;
`;

const CardContentLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardContentRight = styled.div``;
const CardTitleWrapper = styled.div<any>`
  align-items: left;
  white-space: normal;
  line-height: 1.2;
  height: 2.4em;
  text-align: left;
  color: #3f3f3f;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const CardGoodCountWrapper = styled.div`
  border-radius: 1rem;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  width: 70px;
  color: white;
  background-color: rgba(37, 37, 37, 0.8);
`;
