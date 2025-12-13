import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { ConfirmationPopup } from "../../components/ConfirmationPopup";

async function startNewWeekAction() {
  const response = await fetch("/api/weeks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  const [showNewWeekDialog, setShowNewWeekDialog] = useState(false);
  const [showResetSeasonDialog, setShowResetSeasonDialog] = useState(false);

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
      setShowNewWeekDialog(false);
    }
  };

  const handleOpenNewWeekDialog = () => {
    setShowNewWeekDialog(true);
  };

  const handleCloseNewWeekDialog = () => {
    setShowNewWeekDialog(false);
  };

  const handleOpenResetSeasonDialog = () => {
    setShowResetSeasonDialog(true);
  };

  const handleCloseResetSeasonDialog = () => {
    setShowResetSeasonDialog(false);
  };

  const handleResetSeason = async () => {
    if (isResettingSeason) return;

    setIsResettingSeason(true);
    try {
      await resetSeasonAction();
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to reset season");
      setIsResettingSeason(false);
      setShowResetSeasonDialog(false);
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
            onClick={handleOpenNewWeekDialog}
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
            onClick={handleOpenResetSeasonDialog}
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

      <ConfirmationPopup
        open={showNewWeekDialog}
        title="Start New Week"
        onClose={handleCloseNewWeekDialog}
        onConfirm={handleStartNewWeek}
        confirmText="Start Week"
        isProcessing={isStartingWeek}
        processingText="Starting..."
      />

      <ConfirmationPopup
        open={showResetSeasonDialog}
        title="Reset Season"
        message="Are you sure you want to reset the season? This will delete all weeks and scores!"
        onClose={handleCloseResetSeasonDialog}
        onConfirm={handleResetSeason}
        confirmText="Reset Season"
        isProcessing={isResettingSeason}
        processingText="Resetting..."
      />
    </>
  );
};
