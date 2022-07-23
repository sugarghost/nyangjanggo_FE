import React from 'react';
import styled from 'styled-components';

export interface TagProps {
  tag: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  [prop: string]: any;
  bgColor?: string;
  isCancle?: boolean;
}

const Tag = ({ tag, onClick, bgColor, isCancle = false }: TagProps) => {
  const needProps = '';
  return (
    <TagContent className={`${bgColor} active:( bg-main )`} onClick={onClick}>
      {tag}
      {isCancle ? <span className="float-right">X</span> : ''}
    </TagContent>
  );
};

const TagContent = styled.div`
  display: inline-block;
  font-family: 'NEXON Lv2 Gothic';
  font-style: normal;
  font-size: medium;
  border-radius: 9999px;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  margin: 0.5rem;
  :active {
    color: white;
  }
`;

export default Tag;
