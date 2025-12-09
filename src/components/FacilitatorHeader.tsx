import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { Score } from "../types/score";
import type { User } from "../types/user";

interface FacilitatorHeaderProps {
  user: User | undefined;
  scores?: Score[];
  users?: User[];
}

export const FacilitatorHeader = ({
  user,
  scores = [],
  users = [],
}: FacilitatorHeaderProps) => {
  const previousScores = scores.filter((score) => !score.active);

  // Get unique week numbers from scores
  const weeks = [
    ...new Set(previousScores.map((score) => score.weekNumber)),
  ].sort((a, b) => a - b);

  // Build user scores data
  const userScoresData = users.map((u) => {
    const userScores = previousScores.filter((s) => s.userId === u.userId);
    const weekScores: Record<number, number> = {};
    let total = 0;

    weeks.forEach((week) => {
      const weekScore = userScores.find((s) => s.weekNumber === week);
      if (weekScore) {
        weekScores[week] = weekScore.amount;
        total += weekScore.amount;
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
    <Card
      sx={{
        backgroundColor: "#fff",
        boxShadow: 3,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <CardContent sx={{ py: 3, px: 3 }}>
        <Box>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#1a1a1a",
              mb: 1,
            }}
          >
            Pickleball Score Tracker
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#666",
              mb: previousScores.length > 0 ? 2 : 0,
              fontSize: "0.9rem",
            }}
          >
            Hello, {user?.email || "Facilitator"}!
          </Typography>
        </Box>

        {previousScores.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontWeight: "bold",
                color: "#666",
                mb: 1.5,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Player Scores
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
                            color:
                              item.weekScores[week] > 0 ? "#1976d2" : "#999",
                            fontWeight:
                              item.weekScores[week] > 0 ? "bold" : "normal",
                          }}
                        >
                          {item.weekScores[week] > 0
                            ? item.weekScores[week]
                            : "-"}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};
