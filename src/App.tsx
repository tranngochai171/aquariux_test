import { Box, Container } from "@mui/material";

import Weather from "./components/Weather";
import Header from "./components/Header";

function App() {
  return (
    <Container maxWidth="lg">
      <Box my={2}>
        <Header />
        <Weather />
      </Box>
    </Container>
  );
}

export default App;
