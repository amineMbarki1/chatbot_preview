import "./Bounce.css";

export default function Bounce() {
  return (
    <div className="flex flex-row gap-2 reveal">
      <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-bounce" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-bounce [animation-delay:-.3s]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-bounce [animation-delay:-.5s]" />
    </div>
  );
}
