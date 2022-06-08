import { textsIntro } from "../assets/texts"
import Introduction from "../ui/Introduction"
export default function Intro() {
  return (
    <>
    <Introduction texts={textsIntro}/>
    </>
    
  )
}