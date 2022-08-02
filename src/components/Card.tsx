import { ReactComponent as HeartIcon } from '@icon/heart.svg';
import Logo from '@images/nyang_logo.png';
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
  userImg?: string;
}

function Card(props: IProps) {
  const { onClick, styleCustom, cardTitle, cardImg, className, goodCount, nickname, userImg }: IProps = props;

  return (
    <CardContainer onClick={onClick} styleCustom={styleCustom}>
      <div style={{ position: 'relative' }}>
        <CardImgWrapper src={cardImg} />
      </div>
      <CardContentWrapper>
        <CardTitleWrapper styleCustom={styleCustom}>{cardTitle}</CardTitleWrapper>
        <CardSubContentWrapper>
          <CardUserImgWrapper src={userImg || Logo} />
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
  border-radius: 9999px;
  object-fit: cover;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: auto;
`;
const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0 0 0;
  position: relative;
`;

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

  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
`;
const CardNicknameWrapper = styled.div<any>`
  width: 60%;
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
  margin-left: 5px;
`;
const CardGoodCountWrapper = styled.div<any>`
  width: 20%;
  margin: auto;
  float: right;
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
