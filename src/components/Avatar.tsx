import profilePic from "../../public/profile-picture-5.jpg";
import { Context } from "../app";
import { useContext } from "preact/hooks";

export interface Props {
  image: string;
  name: string;
  description?: string;
}

export default function Avatar() {
  const { design } = useContext(Context);

  return (
    <div className="flex items-center gap-4">
      <img
        style={{ width: design.avatar.size, height: design.avatar.size }}
        className="rounded-full"
        src={design.avatar.src}
        alt="avatar pic"
      />
      <div className="font-semibold">
        <div class="text-lg text-justify">{design.name}</div>
        <div className="text-sm text-gray-500">{design.description}</div>
      </div>
    </div>
  );
}
