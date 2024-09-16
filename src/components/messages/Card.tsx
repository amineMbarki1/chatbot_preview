import { ReactNode } from "preact/compat";

interface Props {
  title: string;
  description: string;
  image: string;
  options?: ReactNode;
}

export default function Card({ title, description, image, options }: Props) {
  return (
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow  shrink-0 ">
      <a href="#">
        <img class="rounded-t-lg" src={image} alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">{description}</p>
        {options}
      </div>
    </div>
  );
}
