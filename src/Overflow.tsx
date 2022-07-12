import { Box, Card } from "@mui/material";

export default function Overflow() {
  const cards1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const cards2 = [1, 2, 3, 4, 5, 6];

  return (
    <Box
      sx={{
        // height: "100vh",
        // width: "100vw",
        background: "gray",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "60vh",
          width: "70vw",
          background: "white",
          margin: "auto",

        }}
      >
        <Box
          sx={{ border: "1px solid black", width: "100%", overflowX: "hidden" }}
        >
          {cards1.map((card, i) => {
            return (
              <Card key={i} sx={{ height: "5rem", margin: "10px 5px" }}>
                {card}
              </Card>
            );
          })}
        </Box>
        <Box
          sx={{ border: "1px solid black", width: "100%", overflowX: "hidden" }}
        >
          {cards2.map((card, i) => {
            return (
              <Card key={i} sx={{ height: "5rem", margin: "10px 5px" }}>
                {card}
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
