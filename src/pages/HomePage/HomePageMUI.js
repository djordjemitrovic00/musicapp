import React from "react";
import PlayContent from "../../contents/PlayContent/PlayContent";
import { PWALayoutContainer } from "../../layouts/PWALayout/PWALayout.styled";

const HomePage = () => {
  return (
    <PWALayoutContainer>
      <PlayContent />
    </PWALayoutContainer>
  );
};

export default HomePage;
