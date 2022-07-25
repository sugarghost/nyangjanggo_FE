import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode;
}

const Carousel = (props: IProps) => {
  const { children }: IProps = props;
  return (
    <>
      <CarouselContainer>{children}</CarouselContainer>
    </>
  );
};

export default Carousel;

const CarouselContainer = styled.div`

  overflow-x: scroll;
  overflow-y: hidden;
  margin: 0px auto;
  display: inline-block;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 15px 0px 15px;
`;
