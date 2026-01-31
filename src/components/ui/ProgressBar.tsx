"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function ProgressBar({
  name,
  years,
  maxYears = 10,
}: {
  name: string;
  years: number;
  maxYears?: number;
}) {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const percentage = Math.min((years / maxYears) * 100, 100);

  return (
    <div ref={ref} className="mb-3">
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-gray-200">{name}</span>
        <span className="text-teal-300">{years}年</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-dark-border">
        <div
          className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-300"
          style={{ width: isVisible ? `${percentage}%` : "0%" }}
        />
      </div>
    </div>
  );
}
