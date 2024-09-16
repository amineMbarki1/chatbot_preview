import { CardSelectionMessage as CardSelectionMessageT } from "../../types";
import Button from "../Button";
import Card from "./Card";
import ChatBubble from "./ChatBubble";
import SimpleSlider from "./SimpleSlider";

import { EventObject } from "xstate";

interface Props {
  message: CardSelectionMessageT;
  send: (e: EventObject) => void;
}

export default function CardSelectionMessage({ message, send }: Props) {
  return (
    <ChatBubble text={message.text} from={message.from}>
      <SimpleSlider>
        {message.cardsList.map((card) => (
          <Card
            description={card.text}
            image={card.image}
            title={card.title}
            options={card.options.map((option) => (
              <Button
                onClick={() => send({ type: option.id })}
                className="w-full mb-2"
                key={option.id}
              >
                {option.name}
              </Button>
            ))}
          />
        ))}
      </SimpleSlider>
    </ChatBubble>
  );
}
