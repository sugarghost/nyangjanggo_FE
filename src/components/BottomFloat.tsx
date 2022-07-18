import React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: React.ReactElement;
  className?: string;
}

const BottomFloat = (props: IProps) => {
  const { children, className } = props;

  return <BottomFloatContainer className={className}>{children}</BottomFloatContainer>;
};

const BottomFloatContainer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 100;
  max-width: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default BottomFloat;
