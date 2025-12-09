import { useState, use } from "react";
import { Container, Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { fetchContext } from "./api/context";
import { Header } from "./components/Header";
import { ScoreInputCard } from "./components/ScoreInputCard";
import "./App.css";
import type { User } from "./types/user";
import type { Score } from "./types/score";

const contextPromise = fetchContext();

function App() {
  // Fetch context on mount
  const { user, userScores, scores, users } = use<{
    user: User;
    userScores: Score[];
    scores: Score[];
    users: User[];
  }>(contextPromise);

  const currentScore = scores.find(
    (score) => score.userId === user.userId && score.active
  );
  const [score, setScore] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(!!currentScore);
  const [lastScore, setLastScore] = useState<string>(
    currentScore ? currentScore.amount.toString() : ""
  );

  const handleSubmit = () => {
    if (score.trim() === "") {
      alert("Please enter a valid score");
      return;
    }

    setLastScore(score);
    setHasSubmitted(true);
    setScore("");
  };

  const handleModify = () => {
    if (score.trim() === "") {
      alert("Please enter a valid score");
      return;
    }

    setLastScore(score);
    setScore("");
  };

  const handleRemove = () => {
    setLastScore("");
    setHasSubmitted(false);
    setScore("");
  };

  const isScoreEmpty = score.trim() === "";

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 2,
            position: "relative",
            zIndex: 2,
            pointerEvents: "auto",
          }}
        >
          <Header
            user={user}
            userScores={userScores}
            scores={scores}
            users={users}
          />
          <ScoreInputCard
            userScores={userScores}
            score={score}
            lastScore={lastScore}
            onScoreChange={(value) => {
              const numValue = parseInt(value);
              if (value === "" || (numValue <= 99 && numValue >= 0)) {
                setScore(value);
              }
            }}
            onSubmitClick={handleSubmit}
            onModifyClick={handleModify}
            onRemoveClick={handleRemove}
            hasSubmitted={hasSubmitted}
            isScoreEmpty={isScoreEmpty}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
