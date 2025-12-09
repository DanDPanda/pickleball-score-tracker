import { use } from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { fetchData } from "./api/data";
import { UserView } from "./components/UserView";
import { FacilitatorView } from "./components/FacilitatorView";
import "./App.css";
import type { Data } from "./types/data";

const dataPromise = fetchData();

function App() {
  const { user, userScores, scores, users } = use<Data>(dataPromise);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {user.facilitator ? (
          <FacilitatorView
            user={user}
            userScores={userScores}
            scores={scores}
            users={users}
          />
        ) : (
          <UserView
            user={user}
            userScores={userScores}
            scores={scores}
            users={users}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
