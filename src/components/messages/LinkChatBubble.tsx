import profilePic from "../../../public/profile-picture-5.jpg";
import { LinkMessage } from "../../types";
import LinkPreview from "./LinkPreview";
import SimpleSlider from "./SimpleSlider";

interface Props {
  message: LinkMessage;
}

export default function LinkChatBubble({ message }: Props) {
  return (
    <div className="flex items-start gap-2.5">
      <img className="w-8 h-8 rounded-full" src={profilePic} alt="Jese image" />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Bonnie Green
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {message.text}
        </p>
        <SimpleSlider>
          {message.links.map((url) => (
            <LinkPreview key={url} url={url} />
          ))}
        </SimpleSlider>
      </div>
    </div>
  );
}
