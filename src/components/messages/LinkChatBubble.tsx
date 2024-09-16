import profilePic from "../../../public/profile-picture-5.jpg";
import { LinkMessage } from "../../types";
import ChatBubble from "./ChatBubble";
import LinkPreview from "./LinkPreview";
import SimpleSlider from "./SimpleSlider";

interface Props {
  message: LinkMessage;
}

export default function LinkChatBubble({ message }: Props) {
  console.log(message);

  return (
    <ChatBubble from={message.from} text={message.text}>
      <SimpleSlider>
        {["youtube.com", "google.com"].map((url) => (
          <LinkPreview key={url} url={url} />
        ))}
      </SimpleSlider>
    </ChatBubble>
  );
}
