import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useData } from "../hooks/useData";

export const WeeklyScoresTab = () => {
  const { weeklyScores, users } = useData();

  // Get unique week numbers from scores
  const weeks = [
    ...new Set(weeklyScores.map((score) => score.weekNumber)),
  ].sort((a, b) => a - b);

  // Build user scores data
  const userScoresData = users.map((u) => {
    const userScores = weeklyScores.filter((s) => s.userId === u.userId);
    const weekScores: Record<number, number> = {};
    let total = 0;

    weeks.forEach((week) => {
      const weekScore = userScores.find((s) => s.weekNumber === week);
      if (weekScore) {
        weekScores[week] = weekScore.points;
        total += weekScore.points;
      } else {
        weekScores[week] = 0;
      }
    });

    return {
      user: u,
      weekScores,
      total,
    };
  });

  // Sort by total descending
  userScoresData.sort((a, b) => b.total - a.total);

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
                fontSize: "0.7rem",
                padding: "8px 6px",
                maxWidth: "80px",
              }}
            >
              Player
            </TableCell>
            {weeks.map((week) => (
              <TableCell
                key={`week-${week}`}
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                  padding: "8px 4px",
                }}
              >
                W{week}
              </TableCell>
            ))}
            <TableCell
              align="right"
              sx={{
                fontWeight: "bold",
                fontSize: "0.7rem",
                padding: "8px 6px",
              }}
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userScoresData.map((item, index) => (
            <TableRow key={item.user.userId}>
              <TableCell
                sx={{
                  fontSize: "0.75rem",
                  padding: "8px 6px",
                  color: "#666",
                  fontWeight: index === 0 ? "bold" : "normal",
                  maxWidth: "80px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {index === 0 ? "🏆 " : ""}
                {item.user.email.split("@")[0]}
              </TableCell>
              {weeks.map((week) => (
                <TableCell
                  key={`${item.user.userId}-week-${week}`}
                  align="center"
                  sx={{
                    fontSize: "0.75rem",
                    padding: "8px 4px",
                    color: item.weekScores[week] > 0 ? "#1976d2" : "#999",
                    fontWeight: item.weekScores[week] > 0 ? "bold" : "normal",
                  }}
                >
                  {item.weekScores[week] > 0 ? item.weekScores[week] : "-"}
                </TableCell>
              ))}
              <TableCell
                align="right"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  padding: "8px 6px",
                  color: index === 0 ? "#d4af37" : "#1976d2",
                }}
              >
                {item.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
