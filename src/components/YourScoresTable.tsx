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

interface PreviousWeeksTableProps {
  scores: Score[];
}

export const PreviousWeeksTable = ({ scores }: PreviousWeeksTableProps) => {
  if (scores.length === 0) {
    return (
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "#999" }}>
          No previous scores yet
        </Typography>
      </Box>
    );
  }

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
              Week
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
          {scores.map((score, index) => (
            <TableRow key={score.scoreId}>
              <TableCell
                sx={{
                  fontSize: "0.8rem",
                  padding: "8px 12px",
                  color: "#666",
                }}
              >
                Week {index + 1}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  padding: "8px 12px",
                  color: "#1976d2",
                }}
              >
                {score.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
