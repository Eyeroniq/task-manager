import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl">
      {children}
    </div>
  );
}

export default Card;