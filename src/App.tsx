import { use } from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { fetchData } from "./api/data";
import { UserView } from "./components/UserView";
import { FacilitatorView } from "./components/FacilitatorView";
import "./App.css";
import type { User } from "./types/user";
import type { Score } from "./types/score";

const dataPromise = fetchData();

function App() {
  const { user, userScores, scores, users } = use<{
    user: User;
    userScores: Score[];
    scores: Score[];
    users: User[];
  }>(dataPromise);

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
