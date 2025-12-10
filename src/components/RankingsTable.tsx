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

interface RankingsTableProps {
  scores: Score[];
  users: User[];
}

export const RankingsTable = ({ scores, users }: RankingsTableProps) => {
  if (scores.length === 0) {
    return (
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "#999" }}>
          No scores yet
        </Typography>
      </Box>
    );
  }

  // Calculate total scores
  const userTotals = users.map((user) => ({
    user,
    totalScore: scores
      .filter((score) => score.userId === user.userId)
      .reduce((sum, score) => sum + score.amount, 0),
  }));

  userTotals.sort((a, b) => b.totalScore - a.totalScore);

  // Calculate last week's rankings
  const lastWeekNumber = Math.max(...scores.map((s) => s.weekNumber));
  const lastWeekScores = scores.filter((s) => s.weekNumber === lastWeekNumber);

  const lastWeekRankings = users
    .map((user) => {
      const score = lastWeekScores.find((s) => s.userId === user.userId);
      return {
        user,
        weekScore: score?.amount || 0,
      };
    })
    .filter((item) => item.weekScore > 0);

  lastWeekRankings.sort((a, b) => b.weekScore - a.weekScore);

  return (
    <>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          fontWeight: "bold",
          color: "#666",
          mt: 2,
          mb: 1,
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Total Season Rankings
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
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

      {lastWeekRankings.length > 0 && (
        <>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              fontWeight: "bold",
              color: "#666",
              mt: 2,
              mb: 1,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Last Week's Rankings (Week {lastWeekNumber})
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
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
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lastWeekRankings.map((item, index) => (
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
                      {item.weekScore}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};
