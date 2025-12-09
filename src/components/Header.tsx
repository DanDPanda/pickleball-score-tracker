import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import type { Score } from "../types/score";
import { YourScoresTable } from "./YourScoresTable";
import { RankingsTable } from "./RankingsTable";
import type { User } from "../types/user";

interface HeaderProps {
  user: User | undefined;
  userScores?: Score[];
  scores?: Score[];
  users?: User[];
}

export const Header = ({
  user,
  userScores = [],
  scores = [],
  users = [],
}: HeaderProps) => {
  const [tabValue, setTabValue] = useState(0);

  const previousScores = scores.filter((score) => !score.active);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTab-root": {
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    minHeight: "36px",
                    py: 0,
                    flex: 1,
                  },
                }}
              >
                <Tab label="Your Scores" />
                <Tab label="Rankings" />
              </Tabs>
            </Box>

            {tabValue === 0 && <YourScoresTable userScores={userScores} />}
            {tabValue === 1 && (
              <RankingsTable scores={previousScores} users={users} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
