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

  const [scores, setScores] = useState<{[key: number]: number}>(gameScores.reduce((acc, gameScore) => 
  ({
    ...acc,
    [gameScore.gameNumber]: gameScore.points,
  }), {} as {[key: number]: number}));
  const handleScoreChange = (gameIndex: number, value: string) => {
    setScores(
      {
        ...scores,
        [gameIndex]: parseInt(value) || 0,
      }
    )
  };

  const handleSubmit = () => {
    // TODO: Wire up submission logic
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
          {Array.from({ length: activeWeek.games }, (_, index) => (
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
                value={scores[index]}
                onChange={(e) => handleScoreChange(index, e.target.value)}
                inputProps={{ min: 0 }}
                size="small"
                label="Points"
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
          fullWidth
          sx={{
            mt: 1,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Submit Scores
        </Button>
      </CardContent>
    </Card>
  );
};
