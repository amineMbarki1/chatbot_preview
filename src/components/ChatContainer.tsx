import { EmojiPicker } from "react-twemoji-picker";
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import { useRef, useState } from "preact/hooks";

import Avatar from "./Avatar";
import Bounce from "./Bounce";
import TextChatBubble from "./messages/TextChatBubble";
import { EventObject } from "xstate";
import { ChatContext, Message } from "../types";
import ImageChatBubble from "./messages/ImageChatBubble";
import LinkChatBubble from "./messages/LinkChatBubble";
import ButtonSelectionMessage from "./messages/ButtonSelectionMessage";
import TextInputMessage from "./messages/TextInputMessage";
import CardSelectionMessage from "./messages/CardSelectionMessage";

import "react-twemoji-picker/dist/EmojiPicker.css";
import MultipleChoiceMessage from "./messages/MultipleChoiceMessage";
import StarRatingMessage from "./messages/StarRatingMessage";
interface Props {
  messages: Message[];
  context: ChatContext;
  thinking: boolean;
  send: (e: EventObject) => void;
}

export default function ChatContainer({ send, thinking, context }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const emojiData = Object.freeze(EmojiData);

  console.log(context);

  return (
    <div
      style={{
        borderTopLeftRadius: (window as any).design.borderRadius.topLeft,
        borderTopRightRadius: (window as any).design.borderRadius.topRight,
      }}
      className="fixed bottom-5 right-5  bg-white border border-gray-200  shadow-md overflow-hidden max-w-[400px]"
    >
      <div
        style={{
          background: (window as any).design.headerBgColor,

          borderBottomLeftRadius: (window as any).design.borderRadius
            .bottomLeft,
          borderBottomRightRadius: (window as any).design.borderRadius
            .bottomRight,
        }}
        className="p-6 hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200  sm:flex"
      >
        <Avatar />
      </div>
      <div className="min-w-[350px]  h-[600px] flex flex-col">
        <div className="grow border w-full max-h-full overflow-auto p-6 gap-2 flex flex-col">
          {context.messages.map((message) => (
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
              {message.type === "buttonSelection" && (
                <ButtonSelectionMessage
                  key={message.id}
                  message={message}
                  send={send}
                />
              )}
              {message.type === "textInput" && (
                <TextInputMessage key={message.id} message={message} />
              )}

              {message.type === "cardSelection" && (
                <CardSelectionMessage
                  send={send}
                  message={message}
                  key={message.id}
                />
              )}
              {message.type === "multipleChoice" && (
                <MultipleChoiceMessage message={message} key={message.id} />
              )}
              {message.type === "starRating" && (
                <StarRatingMessage message={message} key={message.id} />
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

            if (context.type === "textInput") {
              console.log((context as any).currenParamName);

              send({
                type: "set_param_value",
                ...{
                  value: inputRef.current?.value,
                  //TODO: FIX THIS TYPO MISSING "T"
                  paramName: (context as any).currenParamName,
                },
              });
            }

            if (inputRef.current) inputRef.current.value = "";
          }}
          className="bg-white border-t  gap-2 flex"
        >
          <button
            onClick={() => setOpenEmojiPicker((prev) => !prev)}
            type="button"
            className="py-5 px-4 outline-none bg-none border-none"
          >
            <svg
              className="h-5 w-5 fill-[#818289]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          </button>
          <input
            ref={inputRef}
            className="grow focus:border-none focus:outline-none"
            type="text"
            placeholder="type your message"
          />
          <button
            onClick={() => setOpenEmojiPicker((prev) => !prev)}
            type="button"
            className="py-5 px-4 outline-none bg-none border-none"
          >
            <svg
              className="h-5 w-5 fill-[#818289]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
            </svg>
          </button>
        </form>

        <div
          className={`transition-all ${
            openEmojiPicker ? "max-h-[100%]" : "max-h-0"
          } `}
        >
          <EmojiPicker
            showFooter
            emojisPerRow={10}
            emojiData={emojiData}
            handleEmojiSelect={console.log}
          />
        </div>
      </div>
    </div>
  );
}
