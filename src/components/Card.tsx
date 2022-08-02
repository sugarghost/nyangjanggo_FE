import { ReactComponent as HeartIcon } from '@icon/heart.svg';
import React from 'react';
import styled from 'styled-components';

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
  cardTitle?: string;
  cardImg?: string;
  className?: string;
  backgroundColor?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  styleCustom?: StyleCustom;
  goodCount?: number;
  nickname?: string;
}

function Card(props: IProps) {
  const { onClick, styleCustom, cardTitle, cardImg, className, goodCount, nickname }: IProps = props;

  return (
    <CardContainer onClick={onClick} styleCustom={styleCustom}>
      <div style={{ position: 'relative' }}>
        <CardImgWrapper className={className} styleCustom={styleCustom} src={cardImg} />
      </div>
      <CardContentWrapper>
        <CardTitleWrapper styleCustom={styleCustom}>{cardTitle}</CardTitleWrapper>
        <CardSubContentWrapper>
          <CardNicknameWrapper>by {nickname}</CardNicknameWrapper>
          <CardGoodCountWrapper>
            <HeartIcon width="20" height="20" className="m-auto float-left" fill="#EB3120" />
            <span className="ml-1">{goodCount}</span>
          </CardGoodCountWrapper>
        </CardSubContentWrapper>
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
  padding: 1rem;
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

  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1), 0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const CardImgWrapper = styled.img<any>`
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  width: 100%;
  height: 230px;
`;

const CardUserImgWrapper = styled.img<any>`
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  width: 100%;
  height: 230px;
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
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0 0 0;
  position: relative;
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
  color: #000;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
`;

const CardSubContentWrapper = styled.div<any>`
  position: relative;
  display: flex;
`;
const CardNicknameWrapper = styled.div<any>`
  width: 80%;
  align-items: left;
  white-space: normal;
  line-height: 1.2;
  height: 2.4em;
  text-align: left;
  color: #787878;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const CardGoodCountWrapper = styled.div<any>`
  width: 20%;
  float: right;
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

const CardGoodCountIconWrapper = styled.div`
  border-radius: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  width: 70px;
  max-width: 100%;
  color: white;
  display: block;
  list-style: none;
  background-color: rgba(37, 37, 37, 0.8);
`;

// 내가 개인적으로 재정의 중
