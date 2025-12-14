import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useData } from "../../hooks/useData";

export const PlayerInput = () => {
  const { weeks, gameScores, player } = useData();
  const activeWeek = weeks.find((week) => week.active);

  const initializeGameScores = () => {
    if (!activeWeek) return [];

    const obj: { [key: number]: { gameNumber: number; points: string } } = {};

    for (let i = 1; i <= 10; i++) {
      const existingScore = gameScores.find(
        (score) =>
          score.playerId === player.playerId &&
          score.weekId === activeWeek.weekId &&
          score.gameNumber === i &&
          score.active
      );
      obj[i] = existingScore
        ? {
            gameNumber: existingScore.gameNumber,
            points:
              existingScore.points === 0 ? "" : existingScore.points.toString(),
          }
        : { gameNumber: i, points: "" };
    }

    return obj;
  };

  const [scores, setScores] = useState(initializeGameScores());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleScoreChange = (gameNumber: number, value: string) => {
    if (value && parseInt(value) > 99) return;

    const newScores = { ...scores };
    newScores[gameNumber] = {
      gameNumber: gameNumber,
      points: value,
    };
    setScores(newScores);
  };

  const handleSubmit = async () => {
    if (!activeWeek || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/game-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeWeekId: activeWeek.weekId,
          playerId: player.playerId,
          gameScores: Object.values(scores).map((score) => ({
            gameNumber: score.gameNumber,
            points: score.points === "" ? 0 : parseInt(score.points),
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit scores");
      }

      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to submit scores");
      setIsSubmitting(false);
    }
  };

  if (!activeWeek) {
    return (
      <Card
        sx={{
          backgroundColor: "#fff",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ py: 3, px: 3 }}>
          <Typography sx={{ textAlign: "center", color: "#666" }}>
            No active week found
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#1a1a1a",
            mb: 3,
          }}
        >
          Enter Game Scores - Week {activeWeek.weekNumber}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 3,
          }}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Typography
                sx={{
                  minWidth: { xs: "100%", sm: 100 },
                  fontWeight: 500,
                  color: "#333",
                  textAlign: { xs: "left", sm: "left" },
                  alignSelf: { xs: "flex-start", sm: "center" },
                }}
              >
                Game {index + 1}:
              </Typography>
              <TextField
                type="number"
                value={scores[index + 1].points}
                onChange={(e) => handleScoreChange(index + 1, e.target.value)}
                size="small"
                label="Points"
                placeholder="0"
                fullWidth
                sx={{
                  maxWidth: { xs: "100%", sm: 200 },
                }}
              />
            </Box>
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          fullWidth
          sx={{
            mt: 1,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Scores"}
        </Button>
      </CardContent>
    </Card>
  );
};
