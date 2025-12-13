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
import { WeeklyScoresTab } from "./WeeklyScoresTab";
import { GameScoresTab } from "./GameScoresTab";
import { useData } from "../hooks/useData";

export const UnifiedHeader = () => {
  const { player, weeks, weeklyScores } = useData();
  const [tabValue, setTabValue] = useState(0);

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
              mb: weeklyScores.length > 0 ? 2 : 0,
              fontSize: "0.9rem",
            }}
          >
            Hello, {player?.email || "Player"}!
          </Typography>
        </Box>

        {weeklyScores.length > 0 && (
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
                <Tab label="Weekly Scores" />
                {weeklyScores.length && (
                  <Tab
                    label={
                      "Week " +
                      ((weeks.find((week) => week.active)?.weekNumber || 0) -
                        1) +
                      " Scores"
                    }
                  />
                )}
              </Tabs>
            </Box>

            {tabValue === 0 && <WeeklyScoresTab />}
            {tabValue === 1 && <GameScoresTab />}
          </>
        )}
      </CardContent>
    </Card>
  );
};
