import { ButtonSelectionMessage as ButtonSelectionMessageT } from "../../types";
import ChatBubble from "./ChatBubble";
import Button from "../Button";
import { EventObject } from "xstate";

interface Props {
  message: ButtonSelectionMessageT;
  send?: (e: EventObject) => void;
}

export default function ButtonSelectionMessage({ message, send }: Props) {
  return (
    <ChatBubble from={message.from} text={message.text}>
      <div className="flex flex-wrap gap-1 mt-2">
        {message.options.map((option) => (
          <Button
            key={option.id}
            onClick={() => {
              if (send) send({ type: message.stateId + option.id });
            }}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </ChatBubble>
  );
}
