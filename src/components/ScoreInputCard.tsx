import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import type { Score } from "../types/score";

interface ScoreInputCardProps {
  userScores?: Score[];
  score: string;
  lastScore: string;
  onScoreChange: (value: string) => void;
  onSubmitClick: () => void;
  onUpdateClick: () => void;
  onRemoveClick: () => void;
  hasSubmitted: boolean;
  isScoreEmpty: boolean;
}

const MAX_SCORE = 99;

export const ScoreInputCard = ({
  userScores = [],
  score,
  lastScore,
  onScoreChange,
  onSubmitClick,
  onUpdateClick,
  onRemoveClick,
  hasSubmitted,
  isScoreEmpty,
}: ScoreInputCardProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (hasSubmitted) {
        onUpdateClick();
      } else {
        onSubmitClick();
      }
    }
  };

  const handleScoreChange = (value: string) => {
    if (
      value === "" ||
      (parseInt(value) <= MAX_SCORE && parseInt(value) >= 0)
    ) {
      onScoreChange(value);
    }
  };

  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        position: "relative",
        zIndex: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Score Display Section */}
        {lastScore && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
              pb: 2,
              borderBottom: "2px solid #f0f0f0",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "#666",
                mb: 1,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Your Score for Week{" "}
              {userScores.find((score) => score.active)?.weekNumber || ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "primary.main",
                lineHeight: 1,
              }}
            >
              {lastScore}
            </Typography>
          </Box>
        )}

        {/* Input Section */}
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            color: "#666",
            textAlign: "center",
            fontWeight: 500,
            fontSize: "0.95rem",
          }}
        >
          {hasSubmitted ? "Update your score" : "Submit your weekly game score"}
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Enter Score"
          type="number"
          value={score}
          onChange={(e) => handleScoreChange(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fafafa",
            },
          }}
          placeholder="0"
          inputProps={{
            inputMode: "numeric",
            min: "0",
            max: String(MAX_SCORE),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={hasSubmitted ? onUpdateClick : onSubmitClick}
          disabled={isScoreEmpty}
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
            mb: hasSubmitted ? 1.5 : 0,
          }}
        >
          {hasSubmitted ? "Update Score" : "Submit Score"}
        </Button>

        {hasSubmitted && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            size="large"
            onClick={onRemoveClick}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              mt: 1.5,
            }}
          >
            Remove Score
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
