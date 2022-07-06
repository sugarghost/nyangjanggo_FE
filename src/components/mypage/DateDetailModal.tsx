import React from "react";

interface IProps {
  onClick?: (e: React.MouseEvent) => void;
  handleOnClose?: () => {};
}

const DateDetailModal = (props: IProps) => {
  const {
    handleOnClose
  } = props

  return (
    <div className="detail-menu-modal">
      <div>// Modal 세부 내용들</div>
      <div className="detail-model-submit">
        <button onClick={handleOnClose}>닫기</button>
      </div>
    </div>
  );
};

export default DateDetailModal;
