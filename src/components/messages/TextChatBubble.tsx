import profilePic from "../../../public/profile-picture-5.jpg";
import { TextMessage } from "../../types";

import "../Bounce.css";

interface Props {
  message: TextMessage;
}

export default function ChatBubble({ message }: Props) {
  return (
    <div
      className={`flex items-start gap-2.5 ${
        message.from === "user" ? "slide-right ml-auto" : "slide-left"
      }`}
    >
      {message.from !== "user" && (
        <img
          className="w-8 h-8 rounded-full"
          src={profilePic}
          alt="Jese image"
        />
      )}
      <div
        className={`flex flex-col  max-w-[320px] leading-1.5 p-2 border-gray-200 bg-gray-100 ${
          message.from === "user"
            ? "rounded-b-xl rounded-tl-lg"
            : "rounded-e-xl rounded-es-xl"
        } dark:bg-gray-700 w-fit`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse"></div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {message.text}
        </p>
      </div>
    </div>
  );
}
