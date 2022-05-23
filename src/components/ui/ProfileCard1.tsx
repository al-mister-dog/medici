
import { Box, Card, CardContent, Divider } from "@mui/material";

export const ProfileCardDemo = 
() => {
  
  return (
    <Card style={{ borderRadius: 12, textAlign: "center" }}>
      <CardContent>
        <h3
          style={{
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: "0.5px",
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          Alan Podemski
        </h3>
        <span
          style={{
            fontSize: 14,
            color: "gray",
            marginBottom: "0.875em",
          }}
        >
          Poland
        </span>
      </CardContent>
      <Divider light />
      <Box display={"flex"}>
        <Box
          p={2}
          flex={"auto"}
          style={{ borderColor: "rgba(0, 0, 0, 0.08)", height: "50%" }}
        >
          <p
            style={{
              fontSize: 12,
              color: "gray",
              fontWeight: 500,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              margin: 0,
            }}
          >
            Assets
          </p>
          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 4,
              letterSpacing: "1px",
            }}
          >
            6941
          </p>
        </Box>
        <Box
          p={2}
          flex={"auto"}
          style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.08)", height: "50%", }}
        >
          <p
            style={{
              fontSize: 12,
              color: "gray",
              fontWeight: 500,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              margin: 0,
            }}
          >
            Liabilities
          </p>
          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 4,
              letterSpacing: "1px",
            }}
          >
            12
          </p>
        </Box>
      </Box>
    </Card>
  );
}

export default ProfileCardDemo;
