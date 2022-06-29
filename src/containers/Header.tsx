import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <header className="p-4">
      <div className="flex items-center justify-between bg-opacity-50">
        <div className="mx-2 text-center">
          <div className="font-extrabold xs:text-3xl md:text-3xl"
            onPointerUp={goHome}
          >LOGO</div>
        </div>
        <div>메뉴</div>
      </div>
    </header>
  );
};

export default Header;
