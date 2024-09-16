import { TextInputMessage as TextInputMessageT } from "../../types";
import ChatBubble from "./ChatBubble";

interface Props {
  message: TextInputMessageT;
}
export default function TextInputMessage({ message }: Props) {
  return <ChatBubble from={message.from} text={message.text}></ChatBubble>;
}
