import { useState } from "preact/hooks";
import { MultipleChoiceInputMessage } from "../../types";
import Button from "../Button";
import ChatBubble from "./ChatBubble";

interface Props {
  message: MultipleChoiceInputMessage;
}

const checkMark = (
  <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
  </svg>
);

export default function MultipleChoiceMessage({ message }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (id: string) => () => {
    if (selected.includes(id))
      return setSelected((prev) => prev.filter((removeId) => id !== removeId));
    setSelected((selected) => [...selected, id]);
  };

  return (
    <ChatBubble from={message.from} text={message.text}>
      <div className="flex gap-1">
        {message.choices.map(({ id, label }) => (
          <Button
            onClick={handleSelect(id)}
            className="flex items-center gap-1"
            key={id}
          >
            {label}
            {selected.includes(id) && checkMark}
          </Button>
        ))}
      </div>
    </ChatBubble>
  );
}
