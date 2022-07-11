import React, { useEffect } from "react";
import { axiosInstance } from "../../apis/axiosInstance";
import styled from "styled-components";

interface IProps {
  onClick?: (e: React.MouseEvent) => void;
  handleOnClose?: () => {};
  selectedDate?: string;
}

const DateDetailModal = (props: IProps) => {
  const { handleOnClose, selectedDate } = props;

  useEffect(() => {
    //TODO 
  }, []);

  return (
    <>
      <div className="detail-menu-modal box-shadow">
        <div>{selectedDate}</div>
        <div className="detail-model-submit">
          <button onClick={handleOnClose}>닫기</button>
        </div>
      </div>
    </>
  );
};

export default DateDetailModal;

const ModalBlocker = styled.div`
  background: #000000;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
