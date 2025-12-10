import { useState } from "react";
import { Box } from "@mui/material";
import { UserHeader } from "./UserHeader";
import { ScoreInputCard } from "./ScoreInputCard";
import type { User } from "../types/user";
import type { Score } from "../types/score";

interface UserViewProps {
  user: User;
  userScores: Score[];
  scores: Score[];
  users: User[];
}

export const UserView = ({
  user,
  userScores,
  scores,
  users,
}: UserViewProps) => {
  const currentScore = scores.find(
    (score) => score.userId === user.userId && score.active
  );
  const [score, setScore] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(!!currentScore);
  const [lastScore, setLastScore] = useState<string>(
    currentScore ? currentScore.amount.toString() : ""
  );

  const handleSubmit = () => {
    if (score.trim() === "") {
      alert("Please enter a valid score");
      return;
    }

    setLastScore(score);
    setHasSubmitted(true);
    setScore("");
  };

  const handleModify = () => {
    if (score.trim() === "") {
      alert("Please enter a valid score");
      return;
    }

    setLastScore(score);
    setScore("");
  };

  const isScoreEmpty = score.trim() === "";

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
      <UserHeader
        user={user}
        userScores={userScores}
        scores={scores}
        users={users}
      />
      <ScoreInputCard
        userScores={userScores}
        score={score}
        lastScore={lastScore}
        onScoreChange={(value) => {
          const numValue = parseInt(value);
          if (value === "" || (numValue <= 99 && numValue >= 0)) {
            setScore(value);
          }
        }}
        onSubmitClick={handleSubmit}
        onModifyClick={handleModify}
        hasSubmitted={hasSubmitted}
        isScoreEmpty={isScoreEmpty}
      />
    </Box>
  );
};
