import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

async function startNewWeekAction(games: number) {
  const response = await fetch("/api/weeks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ games }),
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

export const FacilitatorInput = () => {
  const [isStartingWeek, setIsStartingWeek] = useState(false);
  const [isResettingSeason, setIsResettingSeason] = useState(false);
  const [showGameDialog, setShowGameDialog] = useState(false);
  const [gameCount, setGameCount] = useState("3");

  const handleStartNewWeek = async () => {
    if (isStartingWeek) return;

    setIsStartingWeek(true);
    try {
      const games = parseInt(gameCount) || 3;
      await startNewWeekAction(games);
      window.location.reload();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to start new week"
      );
      setIsStartingWeek(false);
      setShowGameDialog(false);
    }
  };

  const handleOpenDialog = () => {
    setShowGameDialog(true);
  };

  const handleCloseDialog = () => {
    setShowGameDialog(false);
    setGameCount("3");
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
    <>
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
            onClick={handleOpenDialog}
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

      <Dialog open={showGameDialog} onClose={handleCloseDialog}>
        <DialogTitle>Start New Week</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Number of Games"
            type="number"
            fullWidth
            value={gameCount}
            onChange={(e) => setGameCount(e.target.value)}
            inputProps={{ min: 1, max: 20 }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleStartNewWeek}
            variant="contained"
            disabled={isStartingWeek}
          >
            {isStartingWeek ? "Starting..." : "Start Week"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
