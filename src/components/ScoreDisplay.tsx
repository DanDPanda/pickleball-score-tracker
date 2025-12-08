import { Card, CardContent, Typography } from "@mui/material";

interface ScoreDisplayProps {
  score: string;
}

export const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
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
            fontSize: "0.875rem",
            color: "#666",
            mb: 2,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          YOUR SCORE FOR THE WEEK
        </Typography>
        <Typography
          sx={{
            fontSize: "6rem",
            fontWeight: "bold",
            color: "primary.main",
            lineHeight: 1,
          }}
        >
          {score}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "#999",
            mt: 2,
          }}
        >
          Will be submitted at the end of the week
        </Typography>
      </CardContent>
    </Card>
  );
};
