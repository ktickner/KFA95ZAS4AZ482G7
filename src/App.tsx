import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { AppBar } from "./components/AppBar";
import { ContentContainer } from "./components/ContentContainer";

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
          <Autocomplete
            disablePortal
            options={[]}
            renderInput={(params) => (
              <TextField {...params} label="Organisation" />
            )}
          />
        </AppBar>
        <ContentContainer>
          {/* <SearchOrganisationPage /> */}
          <NoResultsPage />
        </ContentContainer>
      </main>
    </ThemeProvider>
  );
}

export default App;
