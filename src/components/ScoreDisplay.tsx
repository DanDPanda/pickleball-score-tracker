import { Card, CardContent, Typography } from "@mui/material";
import type { Week } from "../types/week";

interface ScoreDisplayProps {
  score: string;
  weeks?: Week[];
}

export const ScoreDisplay = ({ score, weeks = [] }: ScoreDisplayProps) => {
  if (!score) return null;

  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        mb: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: "#666",
            mb: 2,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          YOUR SCORE TO BE SUBMITTED FOR WEEK{" "}
          {weeks.find((week) => week.active)?.weekNumber}
        </Typography>
        <Typography
          sx={{
            fontSize: "4rem",
            fontWeight: "bold",
            color: "primary.main",
            lineHeight: 1,
          }}
        >
          {score}
        </Typography>
      </CardContent>
    </Card>
  );
};
