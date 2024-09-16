import { ReactNode } from "preact/compat";
import { Children } from "preact/compat";

export default function SimpleSlider({ children }: { children: ReactNode }) {
  const childArray = Children.toArray(children);
  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-2">
      {childArray.map((child, index) => (
        <div className="min-w-full w-full shrink-0" key={index}>
          {child}
        </div>
      ))}
    </div>
  );
}
