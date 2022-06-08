import Title from "./Title";
import Text from "./Text";

interface Texts {
  title: string;
  paragraphs: string[];
  assignment: string;
}
export default function Introduction({ texts }: { texts: Texts }) {
  return (
    <div
      style={{
        background: "white",
        paddingLeft: "75px",
        paddingRight: "75px",
        overflowX: "hidden",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
      }}
    >
      <Title>{texts.title}</Title>
      {texts.paragraphs.map((paragraph, i) => (
        <Text>{paragraph}</Text>
      ))}
      <Text bold={true}>{texts.assignment}</Text>
    </div>
  );
}
