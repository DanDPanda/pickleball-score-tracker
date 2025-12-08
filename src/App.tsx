import { useState, use, Suspense } from "react";
import { Container, Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { fetchContext } from "./api/context";
import { Header } from "./components/Header";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { InputCard } from "./components/InputCard";
import "./App.css";

const contextPromise = fetchContext();

function App() {
  const [score, setScore] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [lastScore, setLastScore] = useState<string>("");

  // Fetch context on mount
  const context = use(contextPromise);

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
            gap: 3,
            position: "relative",
            zIndex: 2,
            pointerEvents: "auto",
          }}
        >
          <Suspense fallback={<div>Loading score...</div>}>
            <Header email={context?.email} />
          </Suspense>
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
