import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { AppBar } from "./components/AppBar";
import { ContentContainer } from "./components/ContentContainer";
import { OrgAutocomplete } from "./components/OrgAutocomplete";

import { SearchOrganisationPage } from "./pages/SearchOrganisation";
import { NoResultsPage } from "./pages/NoResults";
import { RepositoriesListPage } from "./pages/RepositoriesList";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [selectedOrganization, setSelectedOrganization] = React.useState<
    string | null
  >(null);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <AppBar>
          <OrgAutocomplete
            onOrganizationSelect={(value) =>
              setSelectedOrganization(value?.login || null)
            }
          />
        </AppBar>
        <ContentContainer>
          {/* <NoResultsPage />   This state should be in the repolist */}
          {selectedOrganization ? (
            <RepositoriesListPage orgName={selectedOrganization} />
          ) : (
            <SearchOrganisationPage />
          )}
        </ContentContainer>
      </main>
    </ThemeProvider>
  );
}

export default App;
