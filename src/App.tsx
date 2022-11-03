import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { AppBar } from "./components/AppBar";
import { ContentContainer } from "./components/ContentContainer";
import { OrgAutocomplete } from "./components/OrgAutocomplete";

import { SearchOrganisationPage } from "./pages/SearchOrganisation";
import { NoResultsPage } from "./pages/NoResults";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <AppBar>
          <OrgAutocomplete />
        </AppBar>
        <ContentContainer>
          <SearchOrganisationPage />
          {/* <NoResultsPage /> */}
        </ContentContainer>
      </main>
    </ThemeProvider>
  );
}

export default App;
