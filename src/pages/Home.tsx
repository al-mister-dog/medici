import {Box, Typography } from "@mui/material";
import bankImg1 from "./medici1.jpeg"
import bankImg2 from "./medici2.jpeg"
import bankImg3 from "./medici3.jpeg"

const images = [
  {
    src: bankImg1,
    alt: "Lorenzo de’ Medici and His Artists in the Sculpture Garden by Ottavio Vannini, 1635, via The Uffizi Galleries, Florence"
  }
  ,
  {
    src: bankImg2,
    alt: "Map of Florence from the Nuremberg Chronicle, 1493, via Barry Lawrence Ruderman Map Collection, Stanford University"
  },
  {
    src: bankImg3,
    alt: "Map of Florence from the Nuremberg Chronicle, 1493, via Barry Lawrence Ruderman Map Collection, Stanford University"
  }
]
export default function Home() {
  const randImg = images[Math.floor(Math.random() * images.length)]
  return <>
  <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        margin: "auto",
        borderRadius: "15px",
        background: "#F2EECB",
        marginTop: "150px",
        padding: "20px",
      }}
    >
    <Typography variant="h6" align="center">Learn the art of banking - from the Italian masters to the New York Money Market...</Typography>
    <img style={{height:"55%", width: "55%", marginTop: "20px"}}src={randImg.src} alt={randImg.alt} />
  </Box>
  </>;
}
