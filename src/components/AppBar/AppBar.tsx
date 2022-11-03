import * as React from "react";
import MUIAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import * as S from "./AppBar.styles";

const AppBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MUIAppBar>
      <Toolbar>
        <S.AppBarContainer>{children}</S.AppBarContainer>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
