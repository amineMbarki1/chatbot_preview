import { ReactNode, JSX } from "preact/compat";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function Button({ children, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={twMerge(
        className,
        "text-gray-900  px-3 py-1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl"
      )}
    >
      {children}
    </button>
  );
}
