import { ReactComponent as BackIcon } from '@icon/back.svg';
import { ReactComponent as TrashIcon } from '@icon/x.svg';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type ImageModalProps = {
  content: {
    stepNum: number;
    stepContent: string;
    imageLink: string;
  }[];
  currentIndex: number;
  modalClose: any;
};
const ImageModal = ({ content, currentIndex, modalClose }: ImageModalProps) => {
  const [contentIndex, setContentIndex] = useState<number>(currentIndex);

  const indexChange = (move: number) => {
    setContentIndex((contentIndex + content.length + move) % content.length);
  };

  useEffect(() => {}, [contentIndex]);

  return (
    <ModalBackground onClick={modalClose}>
      <ImageModalContent onClick={(e) => e.stopPropagation()}>
        <ImageViewer>
          <ModalMoveWrapperLeft direction="left" onClick={() => indexChange(-1)}>
            <BackIcon height="12" transform="" fill="white" />
          </ModalMoveWrapperLeft>
          <ModalImage src={content[contentIndex].imageLink} />
          <ModalMoveWrapperRight direction="right" onClick={() => indexChange(+1)}>
            <BackIcon height="12" transform="rotate(180)" fill="white" />
          </ModalMoveWrapperRight>
        </ImageViewer>
        <ModalContent>{content[contentIndex].stepContent}</ModalContent>
      </ImageModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  margin: auto;
`;

const ModalCloseWrapper = styled.div`
  position: absolute;
  background-color: white;
  width: 80%;
  height: 90%;
`;

const ModalMoveWrapperLeft = styled.div<any>`
  border-radius: 9999px;
  position: absolute;
  background-color: rgba(235, 49, 32);
  margin-left: 10px;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ModalMoveWrapperRight = styled.div<any>`
  border-radius: 9999px;
  position: absolute;
  background-color: rgba(235, 49, 32);
  margin-right: 10px;
  width: 30px;
  height: 30px;
  top: 50%;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
const ImageModalContent = styled.div`
  position: relative;
  padding-top: 30px;
  border-radius: 1rem;
  background-color: white;
  width: 90%;
  height: 50%;
  max-width: 768px;
  margin: auto;
  @media screen and (min-width: 681px) {
    height: 70%;
  }

  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
`;

const ImageViewer = styled.div`
  max-width: 768px;
  position: relative;
  text-align: center;
`;

const ModalImage = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  margin: auto;
`;

const ModalContent = styled.div`
  margin: 15px;
  text-align: center;
  overflow-y: scroll;
`;

export default ImageModal;
