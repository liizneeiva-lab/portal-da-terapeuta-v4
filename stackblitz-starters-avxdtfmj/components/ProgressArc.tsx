'use client';

interface ProgressArcProps {
  realizadas: number;
  total: number;
  size?: number;
  label?: string;
}

const GAP_DEGREES = 100;
const START_ANGLE = 90 + GAP_DEGREES / 2;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const largeArcFlag = endDeg - startDeg <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export default function ProgressArc({
  realizadas,
  total,
  size = 96,
  label,
}: ProgressArcProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;
  const sweep = 360 - GAP_DEGREES;
  const endAngleTotal = START_ANGLE + sweep;
  const proporcao = total > 0 ? Math.min(realizadas / total, 1) : 0;
  const endAngleProgresso = START_ANGLE + sweep * proporcao;

  const trackPath = describeArc(cx, cy, r, START_ANGLE, endAngleTotal);
  const progressPath =
    proporcao > 0 ? describeArc(cx, cy, r, START_ANGLE, endAngleProgresso) : '';

  return (
    <div
      className="flex flex-col items-center"
      role="img"
      aria-label={`${realizadas} de ${total} sessões realizadas`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={trackPath}
          fill="none"
          stroke="#EFE6D6"
          strokeWidth={8}
          strokeLinecap="round"
        />
        {progressPath && (
          <path
            d={progressPath}
            fill="none"
            stroke="#BF7E5C"
            strokeWidth={8}
            strokeLinecap="round"
          />
        )}
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-tinta font-display"
          style={{ fontSize: size * 0.22 }}
        >
          {realizadas}/{total}
        </text>
      </svg>
      {label && (
        <span className="mt-1 text-xs text-tinta-muted text-center">
          {label}
        </span>
      )}
    </div>
  );
}
