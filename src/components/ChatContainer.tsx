import { useRef } from "preact/hooks";
import Avatar from "./Avatar";
import Bounce from "./Bounce";
import TextChatBubble from "./messages/TextChatBubble";
import { EventObject } from "xstate";
import { Message } from "../types";
import ImageChatBubble from "./messages/ImageChatBubble";
import LinkChatBubble from "./messages/LinkChatBubble";

interface Props {
  messages: Message[];
  thinking: boolean;
  send: (e: EventObject) => void;
}

export default function ChatContainer({ send, thinking, messages }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="fixed bottom-5 right-5  bg-white border border-gray-200 rounded-lg shadow-md  overflow-hidden">
      <div className="bg-slate-100 p-6 hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex rtl:divide-x-reverse">
        <Avatar />
      </div>
      <div className="min-w-[350px]  h-[600px] flex flex-col">
        <div className="grow border w-full max-h-full overflow-auto p-6 gap-2 flex flex-col">
          {messages.map((message) => (
            <>
              {message.type === "text" && (
                <TextChatBubble key={message.id} message={message} />
              )}
              {message.type === "image" && (
                <ImageChatBubble key={message.id} message={message} />
              )}
              {message.type === "link" && (
                <LinkChatBubble key={message.id} message={message} />
              )}
            </>
          ))}
          {thinking && <Bounce />}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const value = inputRef.current!.value;
            send({
              type: "receive_message",
              ...{ text: value },
            });
          }}
          className="bg-white border-t  gap-2 flex"
        >
          <input
            ref={inputRef}
            className="grow focus:border-none focus:outline-none p-4"
            type="text"
            placeholder="type your message"
          />

          <button
            type="button"
            className="self-center flex-shrink-0 transition-all text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </form>
      </div>
    </div>
  );
}
