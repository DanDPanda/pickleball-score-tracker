import { Box } from "@mui/material";
import { UnifiedHeader } from "./UnifiedHeader";
import type { Data } from "../types/Data";
import { use } from "react";
import { FacilitatorInput } from "../views/facilitator/FacilitatorInput";
import { PlayerInput } from "../views/player/PlayerInput";
import { fetchData } from "../api/data";

const dataPromise = fetchData();

export const ViewTemplate = () => {
  const { user, weeklyScores, gameScores, users } = use<Data>(dataPromise);

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
      {!user.facilitator ? <FacilitatorInput /> : <PlayerInput />}
    </Box>
  );
};
