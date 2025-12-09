import { useState, use } from "react";
import { Container, Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { fetchContext } from "./api/context";
import { Header } from "./components/Header";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { InputCard } from "./components/InputCard";
import "./App.css";
import type { User } from "./types/user";
import type { Score } from "./types/score";
import type { Week } from "./types/week";
import type { Season } from "./types/season";

const contextPromise = fetchContext();

function App() {
  // Fetch context on mount
  const { user, scores, weeks, seasons } = use<{
    user: User;
    scores: Score[];
    weeks: Week[];
    seasons: Season[];
  }>(contextPromise);

  const activeWeek = weeks.find((week) => week.active);
  const activeSeason = seasons.find((season) => season.active);
  const currentScore = scores.find(
    (score) =>
      score.weekId === activeWeek?.weekId &&
      score.seasonId === activeSeason?.seasonId
  );

  const [score, setScore] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(!!currentScore);
  const [lastScore, setLastScore] = useState<string>(
    currentScore ? currentScore.score.toString() : ""
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

  const handleUpdate = () => {
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
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
            position: "relative",
            zIndex: 2,
            pointerEvents: "auto",
          }}
        >
          <Header
            email={user?.email}
            scores={scores.filter(
              (score) => score.weekId !== activeWeek?.weekId
            )}
          />
          <ScoreDisplay score={lastScore} />
          <InputCard
            score={score}
            onScoreChange={(value) => {
              const numValue = parseInt(value);
              if (value === "" || (numValue <= 99 && numValue >= 0)) {
                setScore(value);
              }
            }}
            onSubmitClick={handleSubmit}
            onUpdateClick={handleUpdate}
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
