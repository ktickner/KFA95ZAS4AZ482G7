import React from "react";
import * as S from "./ContentContainer.styles";

const ContentContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <S.Container>{children}</S.Container>;
};

export default ContentContainer;
