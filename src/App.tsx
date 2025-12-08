import { useState, use, Suspense } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Alert,
} from "@mui/material";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// API call to fetch context
const fetchContext = async () => {
  const response = await fetch("/api/context");
  if (!response.ok) {
    throw new Error("Failed to fetch context");
  }
  return response.json();
};

function App() {
  const [score, setScore] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [lastScore, setLastScore] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState(false);

  // Use the context from the API call
  const context = use(fetchContext());

  const handleSubmit = () => {
    if (score.trim() === "") {
      alert("Please enter a valid score");
      return;
    }

    setLastScore(score);
    setHasSubmitted(true);
    setSuccessMessage(true);
    setScore("");

    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const handleUpdate = () => {
    if (score.trim() === "") {
      alert("Please enter a valid score");
      return;
    }

    setLastScore(score);
    setSuccessMessage(true);
    setScore("");

    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const handleRemove = () => {
    setLastScore("");
    setHasSubmitted(false);
    setScore("");
    setSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const isScoreEmpty = score.trim() === "";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            position: "relative",
            zIndex: 2,
            pointerEvents: "auto",
          }}
        >
          {/* Header */}
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
                🎾Pickleball Score Tracker🎾
              </Typography>
              <Suspense
                fallback={
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#666",
                      mb: 1,
                      fontSize: "0.9rem",
                    }}
                  >
                    Loading...
                  </Typography>
                }
              >
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    mb: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  Hello, {context?.email || "Player"}!
                </Typography>
              </Suspense>
            </CardContent>
          </Card>

          {/* Large Score Display - On Top */}
          {lastScore && (
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
                  Weekly Score to Submit
                </Typography>
                <Typography
                  sx={{
                    fontSize: "6rem",
                    fontWeight: "bold",
                    color: "primary.main",
                    lineHeight: 1,
                  }}
                >
                  {lastScore}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "#999",
                    mt: 2,
                  }}
                >
                  Updates at end of week
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Main Card */}
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

              {/* Score Input */}
              <TextField
                fullWidth
                variant="outlined"
                label="Enter Score"
                type="number"
                value={score}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (parseInt(value) <= 99 && parseInt(value) >= 0)
                  ) {
                    setScore(value);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (hasSubmitted) {
                      handleUpdate();
                    } else {
                      handleSubmit();
                    }
                  }
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                  },
                }}
                placeholder="0"
                inputProps={{ inputMode: "numeric", min: "0", max: "99" }}
              />

              {/* Submit / Update Button */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={hasSubmitted ? handleUpdate : handleSubmit}
                disabled={isScoreEmpty}
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  mb: 1.5,
                }}
              >
                {hasSubmitted ? "Update Score" : "Submit Score"}
              </Button>

              {/* Remove Button */}
              {hasSubmitted && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  size="large"
                  onClick={handleRemove}
                  sx={{
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Remove Score
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Success Alert */}
          {successMessage && (
            <Alert
              severity="success"
              sx={{
                mt: 2,
                animation: "slideIn 0.3s ease-in-out",
              }}
            >
              {hasSubmitted
                ? "Score updated!"
                : "Score submitted successfully!"}
            </Alert>
          )}
        </Box>

        {/* Footer */}
        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            color: "#999",
            mt: 4,
            position: "relative",
            zIndex: 2,
          }}
        >
          Updated weekly
        </Typography>
      </Container>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ThemeProvider>
  );
}

export default App;
