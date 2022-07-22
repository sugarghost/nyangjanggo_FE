import React from 'react';
import styled from 'styled-components';

export interface TagProps {
  tag: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  [prop: string]: any;
}

const Tag = ({ tag, onClick }: TagProps) => {
  const needProps = '';
  return <TagContent onClick={onClick}>{tag}</TagContent>;
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
  background-color: rgba(239, 239, 240, 1);
  :active {
    background-color: rgba(235, 49, 32, 1);
    color: white;
  }
`;

export default Tag;
