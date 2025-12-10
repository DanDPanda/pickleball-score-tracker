import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "./App.css";
import { ViewTemplate } from "./components/ViewTemplate";

function App() {
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
        <ViewTemplate />
      </Container>
    </ThemeProvider>
  );
}

export default App;
