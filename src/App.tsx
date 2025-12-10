import { use } from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { fetchData } from "./api/data";
import { PlayerView } from "./views/player/UserView";
import { FacilitatorView } from "./views/facilitator/FacilitatorView";
import "./App.css";
import type { Data } from "./types/Data";

const dataPromise = fetchData();

function App() {
  const { user, weeklyScores, gameScores, users } = use<Data>(dataPromise);

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
        {!user.facilitator ? (
          <FacilitatorView
            user={user}
            weeklyScores={weeklyScores}
            users={users}
            gameScores={gameScores}
          />
        ) : (
          <PlayerView
            user={user}
            weeklyScores={weeklyScores}
            users={users}
            gameScores={gameScores}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
