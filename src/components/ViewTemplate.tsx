import { Box } from "@mui/material";
import { UnifiedHeader } from "./UnifiedHeader";
import type { Data } from "../types/Data";
import { use } from "react";
import { FacilitatorInput } from "../views/facilitator/FacilitatorInput";
import { PlayerInput } from "../views/player/PlayerInput";
import { fetchData } from "../api/data";
import { DataProvider } from "../providers/DataProvider";

const dataPromise = fetchData();

export const ViewTemplate = () => {
  const data = use<Data>(dataPromise);

  return (
    <DataProvider value={data}>
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
        <UnifiedHeader />
        {!data.player.facilitator ? <FacilitatorInput /> : <PlayerInput />}
      </Box>
    </DataProvider>
  );
};
