import { useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import type { User } from "../../types/User";
import type { WeeklyScore } from "../../types/WeeklyScore";
import type { GameScore } from "../../types/GameScore";

interface FacilitatorViewProps {
  user: User;
  weeklyScores: WeeklyScore[];
  users: User[];
  gameScores: GameScore[];
}

async function startNewWeekAction() {
  const response = await fetch("/api/weeks", {
    method: "POST",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to start new week");
  }

  return await response.json();
}

async function resetSeasonAction() {
  const response = await fetch("/api/weeks", {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to reset season");
  }

  return await response.json();
}

export const FacilitatorView = ({
  user,
  weeklyScores,
  users,
  gameScores,
}: FacilitatorViewProps) => {
  const [isStartingWeek, setIsStartingWeek] = useState(false);
  const [isResettingSeason, setIsResettingSeason] = useState(false);

  const handleStartNewWeek = async () => {
    if (isStartingWeek) return;

    setIsStartingWeek(true);
    try {
      await startNewWeekAction();
      window.location.reload();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to start new week"
      );
      setIsStartingWeek(false);
    }
  };

  const handleResetSeason = async () => {
    if (isResettingSeason) return;

    if (
      !confirm(
        "Are you sure you want to reset the season? This will delete all weeks and scores!"
      )
    ) {
      return;
    }

    setIsResettingSeason(true);
    try {
      await resetSeasonAction();
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to reset season");
      setIsResettingSeason(false);
    }
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
      <UnifiedHeader
        user={user}
        weeklyScores={weeklyScores}
        users={users}
        gameScores={gameScores}
      />

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
            disabled={isStartingWeek}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {isStartingWeek ? "Starting New Week..." : "Start New Week"}
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleResetSeason}
            disabled={isResettingSeason}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {isResettingSeason ? "Resetting Season..." : "Reset Season"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
