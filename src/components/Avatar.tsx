import profilePic from "../../public/profile-picture-5.jpg";

export interface Props {
  image: string;
  name: string;
  description?: string;
}

export default function Avatar() {
  return (
    <div className="flex items-center gap-4">
      <img
        className="w-12 h-12 rounded-full"
        src={profilePic}
        alt="avatar pic"
      />
      <div className="font-semibold">
        <div class="text-lg text-justify">Jese Leos</div>
        <div className="text-sm text-gray-500">Hi i'm a crazy bot</div>
      </div>
    </div>
  );
}
