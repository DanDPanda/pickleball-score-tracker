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
import type { Score } from "../types/score";
import type { User } from "../types/user";

interface EveryonesScoresTableProps {
  scores: Score[];
  users: User[];
}

export const EveryonesScoresTable = ({
  scores,
  users,
}: EveryonesScoresTableProps) => {
  if (scores.length === 0) {
    return (
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "#999" }}>
          No scores yet
        </Typography>
      </Box>
    );
  }

  // Calculate total scores per user
  const userTotals = users.map((user) => ({
    user,
    totalScore: scores
      .filter((score) => score.userId === user.userId)
      .reduce((sum, score) => sum + score.amount, 0),
  }));

  // Sort by total score descending
  userTotals.sort((a, b) => b.totalScore - a.totalScore);

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
            <TableCell
              align="right"
              sx={{
                fontWeight: "bold",
                fontSize: "0.75rem",
                padding: "8px 12px",
              }}
            >
              Total Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userTotals.map((item, index) => (
            <TableRow key={item.user.userId}>
              <TableCell
                sx={{
                  fontSize: "0.8rem",
                  padding: "8px 12px",
                  color: "#666",
                  fontWeight: index === 0 ? "bold" : "normal",
                }}
              >
                {index === 0 ? "🏆 " : ""}
                {item.user.email.split("@")[0]}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  padding: "8px 12px",
                  color: index === 0 ? "#d4af37" : "#1976d2",
                }}
              >
                {item.totalScore}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
