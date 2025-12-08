import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

interface InputCardProps {
  score: string;
  onScoreChange: (value: string) => void;
  onSubmitClick: () => void;
  onUpdateClick: () => void;
  onRemoveClick: () => void;
  hasSubmitted: boolean;
  isScoreEmpty: boolean;
}

const MAX_SCORE = 99;

export const InputCard = ({
  score,
  onScoreChange,
  onSubmitClick,
  onUpdateClick,
  onRemoveClick,
  hasSubmitted,
  isScoreEmpty,
}: InputCardProps) => {
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
        backgroundColor: "#fafafa",
        position: "relative",
        zIndex: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            color: "#666",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Submit your weekly game score
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
              backgroundColor: "#fff",
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
