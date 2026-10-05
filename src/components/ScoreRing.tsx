interface ScoreRingProps {
  score: number;
  size?: number;
  dark?: boolean;
}

export default function ScoreRing({ score, size = 120, dark = false }: ScoreRingProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";
  const trackColor = dark ? "#374151" : "#f1f5f9";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={10}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.2s ease-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-bold ${dark ? "text-white" : "text-neutral-900"}`}>
          {score}
        </span>
        <span className={`text-xs font-medium ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
          / 100
        </span>
      </div>
    </div>
  );
}
