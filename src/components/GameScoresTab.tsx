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
  const { gameScores, players, player } = useData();

  const previousGameScores = gameScores.filter(
    (gameScore, index) =>
      gameScore.previous &&
      gameScores
        .filter((gs) => gs.gameNumber === index + 1)
        .every((g) => g.points !== 0)
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
  const gameData = players.reduce((accum, player) => {
    accum[player.playerId] = {
      playerId: player.playerId,
      name: player.email.split("@")[0],
      gameScores: previousGameScores
        .filter((score) => score.playerId === player.playerId)
        .sort((a, b) => a.gameNumber - b.gameNumber),
    };
    return accum;
  }, {} as Record<string, { playerId: string; name: string; gameScores: GameScore[] }>);

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
          {Object.values(gameData)
            .sort((a) => (a.playerId === player.playerId ? -1 : 1))
            .map((data, index) => (
              <TableRow key={data.name}>
                <TableCell
                  sx={{
                    fontWeight: index === 0 ? "bold" : "normal",
                    fontSize: "0.8rem",
                    padding: "8px 12px",
                    color: "#666",
                    backgroundColor: index === 0 ? "#edfdedff" : "inherit",
                  }}
                >
                  {data.name}
                </TableCell>
                {data.gameScores.map((gameScore) => (
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "0.8rem",
                      padding: "8px 12px",
                      color: "#666",
                      backgroundColor: index === 0 ? "#edfdedff" : "inherit",
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
