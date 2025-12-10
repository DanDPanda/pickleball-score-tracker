import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useData } from "../hooks/useData";
import type { GameScore } from "../types/GameScore";

export const GameScoresTab = () => {
  const { gameScores, users } = useData();

  const previousGameScores = gameScores.filter(
    (gameScore) => gameScore.previous
  );

  if (previousGameScores.length === 0) {
    return (
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "#999" }}>
          No game scores yet
        </Typography>
      </Box>
    );
  }

  // Get unique game numbers from scores (assuming we track games within weeks)
  // For now, we'll display individual weekly scores as "games"
  const gameData = users.reduce((accum, user) => {
    accum[user.userId] = {
      name: user.email.split("@")[0],
      gameScores: previousGameScores
        .filter((score) => score.userId === user.userId)
        .sort((a, b) => a.gameNumber - b.gameNumber),
    };
    return accum;
  }, {} as Record<string, { name: string; gameScores: GameScore[] }>);

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        backgroundColor: "#fafafa",
        border: "1px solid #e0e0e0",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "0.75rem",
                padding: "8px 12px",
              }}
            >
              Player
            </TableCell>
            {gameData[Object.keys(gameData)[0]].gameScores.map((gameScore) => (
              <TableCell
                key={gameScore.gameNumber}
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  padding: "8px 12px",
                }}
              >
                G{gameScore.gameNumber}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(gameData).map((item) => (
            <TableRow key={item.name}>
              <TableCell
                sx={{
                  fontSize: "0.8rem",
                  padding: "8px 12px",
                  color: "#666",
                }}
              >
                {item.name}
              </TableCell>
              {item.gameScores.map((gameScore) => (
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "0.8rem",
                    padding: "8px 12px",
                    color: "#666",
                  }}
                >
                  {gameScore.points}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
