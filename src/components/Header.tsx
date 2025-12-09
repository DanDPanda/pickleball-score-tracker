import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import type { Score } from "../types/score";
import { PreviousWeeksTable } from "./PreviousWeeksTable";
import type { User } from "../types/user";

interface HeaderProps {
  user: User | undefined;
  scores?: Score[];
}

export const Header = ({ user, scores = [] }: HeaderProps) => {
  const previousScores = scores.filter((score) => !score.active);
  const userScores = previousScores.filter(
    (score) => score.userId === user?.userId
  );
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
              mb: scores.length > 0 ? 2 : 0,
              fontSize: "0.9rem",
            }}
          >
            Hello, {user?.email || "Player"}!
          </Typography>
        </Box>

        {scores.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontWeight: "bold",
                color: "#666",
                mb: 1,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Previous Weeks
            </Typography>
            <PreviousWeeksTable scores={userScores} />
          </>
        )}
      </CardContent>
    </Card>
  );
};
