import { useState } from "preact/hooks";
import { StarRatingMessage as StarRatingMessageT } from "../../types";
import Button from "../Button";
import ChatBubble from "./ChatBubble";

interface Props {
  message: StarRatingMessageT;
}

export default function StarRatingMessage({ message }: Props) {
  const [rating, setRating] = useState(0);

  return (
    <ChatBubble from={message.from} text={message.from}>
      <div className="flex items-center">
        {Array(message.level)
          .fill(5)
          .map((_, i) => (
            <button onClick={() => setRating(i + 1)} key={i}>
              <svg
                className={`transition-all w-4 h-4  ${
                  i < rating ? "text-yellow-300" : "text-gray-300"
                } ms-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </button>
          ))}
      </div>
      <Button className="mt-3">Confirm</Button>
    </ChatBubble>
  );
}
