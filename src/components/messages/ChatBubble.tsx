import { ReactNode, useContext } from "preact/compat";
import { Context } from "../../app";

import "../Bounce.css";

interface Props {
  from: string;
  text?: string;
  children?: ReactNode;
}

export default function ChatBubble({ text, children, from }: Props) {
  const { design } = useContext(Context);

  return (
    <div
      className={`flex items-start gap-2.5 ${
        from === "user" ? "slide-right ml-auto" : "slide-left"
      }`}
    >
      {from !== "user" && (
        <img
          className="w-8 h-8 rounded-full"
          src={design.avatar.src}
          alt="Jese image"
        />
      )}
      <div
        style={{ background: (window as any).design.botChatBubble.bgColor }}
        className={`flex flex-col  max-w-full leading-1.5 p-4 border-gray-200 bg-gray-100 ${
          from === "user"
            ? "rounded-t-xl rounded-bl-xl"
            : "rounded-e-xl rounded-es-xl"
        } w-fit`}
      >
        {from !== "user" && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900">
              {design.name}
            </span>
          </div>
        )}
        <p className="text-sm font-normal py-2.5 text-gray-900">{text}</p>
        {children}
      </div>
    </div>
  );
}
