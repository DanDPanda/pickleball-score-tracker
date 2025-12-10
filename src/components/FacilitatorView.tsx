import { Box, Button, Card, CardContent } from "@mui/material";
import { FacilitatorHeader } from "./FacilitatorHeader";
import type { User } from "../types/user";
import type { Score } from "../types/score";

interface FacilitatorViewProps {
  user: User;
  userScores: Score[];
  scores: Score[];
  users: User[];
}

export const FacilitatorView = ({
  user,
  scores,
  users,
}: FacilitatorViewProps) => {
  const handleStartNewWeek = () => {
    // Logic to be added later
  };

  const handleResetSeason = () => {
    // Logic to be added later
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 2,
        position: "relative",
        zIndex: 2,
        pointerEvents: "auto",
      }}
    >
      <FacilitatorHeader user={user} scores={scores} users={users} />

      <Card
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <CardContent
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartNewWeek}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Start New Week
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleResetSeason}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Reset Season
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
