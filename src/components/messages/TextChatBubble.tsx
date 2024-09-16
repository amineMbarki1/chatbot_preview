import { TextMessage } from "../../types";
import ChatBubble from "./ChatBubble";
import "../Bounce.css";

interface Props {
  message: TextMessage;
}

export default function TextChatBubble({ message }: Props) {
  return <ChatBubble from={message.from} text={message.text}></ChatBubble>;
}
