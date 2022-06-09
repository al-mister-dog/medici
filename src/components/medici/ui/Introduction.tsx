import Title from "./Title";
import Text from "./Text";
import { useState } from "react";
import { Button } from "@mui/material";

interface Texts {
  title: string;
  paragraphs: string[];
  assignment: string;
}
export default function Introduction({ texts }: { texts: Texts }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  function toggleText() {
    setExpanded(!expanded);
  }
  return (
    <div
    // style={{
    //   background: "white",
    //   paddingLeft: "75px",
    //   paddingRight: "75px",
    //   overflowX: "hidden",
    //   borderTopLeftRadius: "15px",
    //   borderTopRightRadius: "15px",
    // }}
    >
      <Title>{texts.title}</Title>
      {expanded ? (
        texts.paragraphs.map((paragraph, i) => <Text>{paragraph}</Text>)
      ) : (
        <Text>{texts.paragraphs[0]}</Text>
      )}
      {expanded && <Text bold={true}>{texts.assignment}</Text>}
      {expanded ? (
        <Button onClick={toggleText}>...Close</Button>
      ) : (
        <Button onClick={toggleText}>...Continue reading</Button>
      )}
      
      
    </div>
  );
}
