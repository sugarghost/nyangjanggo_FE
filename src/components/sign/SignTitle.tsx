import React from "react";
import styled from "styled-components";

interface StyleCustom{
  height?: string;

}

interface IProps {
  title?: string;
  description?: string;
  children?: React.ReactElement;
  styleCustom?: StyleCustom;
}

const SignTitle = (props: IProps) => {
  const { title, description, children, styleCustom }: IProps = props;

  return <TitleContainer styleCustom={styleCustom}>{children}</TitleContainer>;
};

const TitleContainer = styled.div<any>`
  padding: 0px 24px;
  font-size: 50px;
  font-weight: bold;
  margin-top: -300px;
`;

const LogoWrapper = styled.div`
  width: 215px;
  height: 27px;
  margin-bottom: 80px;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  margin-top: 80px;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 120%;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""}
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const DescWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""}
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 16px 0px;
`;

export default SignTitle;
