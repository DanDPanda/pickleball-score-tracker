import { Card, CardContent, Typography } from "@mui/material";
import { Suspense } from "react";

interface HeaderProps {
  email: string | undefined;
}

export const Header = ({ email }: HeaderProps) => (
  <Card
    sx={{
      backgroundColor: "#fff",
      boxShadow: 3,
      borderRadius: 2,
      mb: 2,
    }}
  >
    <CardContent sx={{ py: 3, px: 3 }}>
      <Typography
        variant="h6"
        component="h1"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#1a1a1a",
          mb: 0,
        }}
      >
        🎾 Pickleball Score Tracker 🎾
      </Typography>
      <Suspense fallback={<></>}>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#666",
            mb: 1,
            fontSize: "0.9rem",
          }}
        >
          Hello, {email || "Player"}!
        </Typography>
      </Suspense>
    </CardContent>
  </Card>
);
