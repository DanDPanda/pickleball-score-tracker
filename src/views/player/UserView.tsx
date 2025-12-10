import { Box } from "@mui/material";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import type { User } from "../../types/User";
import type { WeeklyScore } from "../../types/WeeklyScore";
import type { GameScore } from "../../types/GameScore";

interface UserViewProps {
  user: User;
  weeklyScores: WeeklyScore[];
  users: User[];
  gameScores: GameScore[];
}

export const PlayerView = ({
  user,
  weeklyScores,
  users,
  gameScores,
}: UserViewProps) => {
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
    </Box>
  );
};
